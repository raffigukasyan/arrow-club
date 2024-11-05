import React from "react";
import {createRoot} from 'react-dom/client';
import {useState, useReducer, useEffect, useMemo, Fragment} from "react";
import axios from "axios";
import Select from "./components/Select.jsx";
import {DayType, TotalAmount} from "./components/Reserved/ReservedComponent.jsx";
import WeaponsChoose from "./components/Reserved/WeaponsChoose.jsx";
import ButtonChecked from "./components/ButtonChecked.jsx";
import ReservedSubmit from "./components/Reserved/ReservedSubmit.jsx";
import {ToastContainer, toast, Bounce} from 'react-toastify';

function reducer(state, action) {
    switch (action.type) {
        case 'dayType': {
            return {...state, dayType: action.value}
        }
        case 'currentWeaponsNumber': {
            return {...state, currentWeaponsNumber: action.value}
        }
        case 'currentSelectWeapons': {
            return {...state, currentSelectWeapons: [...action.value]}
        }
        case 'currentDate': {
            return {...state, currentDate: {...action.value}}
        }
        case 'selectInstructor': {
            return {...state, selectInstructor: {...action.value}}
        }
        case 'personalGallerey': {
            return {...state, personalGallerey: action.value}
        }
        case 'reloadData': {
            return {...action}
        }
    }
}

function FormReservation() {
    const [state, dispatch] = useReducer(reducer, {
        dayType: 'weekday', currentWeaponsNumber: 1, currentSelectWeapons: [{
            weaponSelect: {}
        }], currentDate: {}, selectInstructor: {}, personalGallerey: 'N'
    })
    const [loader, setLoader] = useState(false);
    const [section, setSection] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [selectSection, setSelectSection] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const dataWeapons = await axios.get(`https://63eb2da0fb6b6b7cf7d92144.mockapi.io/weapons`);
            const dataInstructor = await axios.post(`${baseUrl}api/v1/reservation/get-instructors`, {
                body: JSON.stringify({'sdad': 'dsds'})
            });
            // if (dataWeapons.data.status === "success") {
            //     setSection(dataWeapons.data.data);
            // }
            if(dataWeapons.data.length) setSection(dataWeapons.data);
            if (dataInstructor.data.status === "success") {
                setInstructors(dataInstructor.data.data);
            }
            setLoader(true);
        }
        fetchData()
    }, []);

    const weaponsSectionOptions = section.map(item => ({value: item, label: item.name}));
    const instructorOptions = instructors.map(item => ({value: item, label: item.name}));

    const currentWeaponsAmmo = state.currentSelectWeapons.filter((weapon) => weapon?.weaponSelect?.value?.id).map((weapon) => `${weapon?.weaponSelect?.label}:${weapon?.cartridges.shotCount}`)
    const currentWeaponsData = state.currentSelectWeapons.map((weapon) => weapon?.weaponSelect?.value?.id).filter((weapon) => weapon);

    const totalAmount = useMemo(() => {
        const sumAllWeapons = state.currentSelectWeapons.reduce((agg, weapon) => {
            if (Object.keys(weapon.weaponSelect).length) {
                return agg += weapon.weaponSelect.value['base-price'] + weapon.cartridges.initalCartidgesStepPrice
            }
            return agg
        }, 0);

        if (Object.keys(selectSection).length) {
            const sumPersonalGallery = state.personalGallerey === 'Y' ? selectSection.value.gallery[`${state.dayType}-price`] : 0

            return selectSection.value.direction[`${state.dayType}-price`] + sumPersonalGallery + sumAllWeapons
        }
        return 0;
    }, [selectSection, state.currentSelectWeapons, state.dayType, state.personalGallerey])


    const onChangeSection = (value) => {
        setSelectSection({...value})
    }

    const onChangeData = (type, value) => {
        dispatch({type: type, value: value})
    }

    const handleSubmit = (data) => {
        axios.post(`${baseUrl}api/v1/reservation/create`, {
            "reservationType": "arsenal",
            "dayType": state.dayType,
            "priceSum": totalAmount,
            "instructor": state?.selectInstructor ? state?.selectInstructor?.value?.id : '',
            "personalGallery": state.personalGallerey,
            "date": state?.currentDate?.selectDate,
            "hours": state?.currentDate?.selectTime?.time,
            "fullName": data?.fullName,
            "email": data?.email,
            "phone": data?.phone,
            "weaponCount": state?.currentWeaponsNumber,
            "weapon": currentWeaponsData,
            "weaponCartridges": currentWeaponsAmmo
        }).then(res => {
            if (res.data.status === "success") {
                setShow(false)
                toast.success('Успешно забронирована', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
            if (res.data.status === "error") {
                res.data.errors.forEach((error) => {
                    toast.error(error.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                })
            }
        });
    }

    const toStringNumber = (num) => Number(num).toLocaleString()

    const myCom = useMemo(() => {
        if (!loader) return ''
        return <>
            <Select onChange={onChangeSection} options={weaponsSectionOptions} title="Выбирите раздел"/>
            <DayType onChange={onChangeData}/>
        </>
    }, [section]);

    const weaponChoose = useMemo(() => {
        return <WeaponsChoose currentSelectWeapons={state.currentSelectWeapons}
                              currentWeaponsNumber={state.currentWeaponsNumber} onChange={onChangeData}
                              section={selectSection?.value}/>
    }, [selectSection, state.currentSelectWeapons, state.currentWeaponsNumber]);



    return (<Fragment>
        {myCom}
        <div className="mb-[31px] flex justify-between items-center">
            <span className="text-white text-lg leading-5">Базовая стоимость</span>
            <span
                className="text-white text-lg leading-5 opacity-50">{selectSection?.value?.direction[`${state.dayType}-price`] ? toStringNumber(selectSection?.value?.direction[`${state.dayType}-price`]) : '0'} р.</span>
        </div>
        {loader ? <>
            {weaponChoose}
            <Select className="mb-5"
                    options={instructorOptions}
                    onChange={(instructor) => {
                        onChangeData("selectInstructor", instructor)
                    }}
                    title='Выберите инстуктора'/>
            <ButtonChecked onClick={(val) => onChangeData('personalGallerey', val ? 'Y' : 'N')}
                           className="flex justify-between mb-6">
                        <span className="btn__content">
                            Персональная галерея
                        </span>
                <span className="btn__content">
                            +{selectSection?.value?.gallery[`${state.dayType}-price`] ? toStringNumber(selectSection?.value?.gallery[`${state.dayType}-price`]) : ' 0'} р.
                        </span>
            </ButtonChecked>
            <TotalAmount amount={toStringNumber(totalAmount)}/>
            <ReservedSubmit onChageData={onChangeData} show={show} setShow={setShow} handleSubmit={handleSubmit}
                            stateForm={state}
                            amount={totalAmount}/>
        </> : <div className="w-full flex justify-center items-center">
            <img className="" src="/img/loader.svg" alt=""/>
        </div>}
        <ToastContainer/>
    </Fragment>)
}

let domContainer = createRoot(document.querySelector('#formReservation'));
domContainer.render(<FormReservation/>);