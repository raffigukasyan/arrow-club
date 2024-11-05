import React, {useEffect} from "react";
import {useState, useMemo, Fragment} from "react";
import ModalReserved from "./ModalReserved.jsx";
import ButtonChecked from "./components/ButtonChecked.jsx";
import Select from "./components/Select.jsx";
import ProgramAndGung from "./ProgramAndGung.jsx";
import Modal from "./components/Modal.jsx";
import axios from "axios";
import InputForm from "./InputForm.jsx";


export  default function Reservation({onChangeAlert, onChangeShow, selectProgram, allProgram, gungs, instructor}) {
    const [dataReserv, setDataReserv] = useState({
        dayType: 'weekday',
        basicPrice: selectProgram ? selectProgram["base-price"] : 0,
        // shoatsPrice: Number(dataForm.weekday.shoatsPrice.price),
        shooterCount: 1,
        instructor: '',
        program: selectProgram ? selectProgram : '',
        weapon: '',
        personalGallery: false,
        personalInstructor: false,
        instructorPrice: selectProgram ? selectProgram.instructor['weekday-price'] : 0,
        galleryPrice: selectProgram ? selectProgram.gallery['weekday-price'] : 0,
        date: '',
        hourse: '',
    });
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState(undefined);


    const priceSum = useMemo(() => {
        return dataReserv.basicPrice * dataReserv.shooterCount + Number(`${dataReserv.personalGallery ? dataReserv.galleryPrice : 0}`) + Number(`${dataReserv.personalInstructor ? dataReserv.instructorPrice : 0}`);
    }, [dataReserv]);

    const person = [1, 2, 3];

    const selectGung = selectProgram ? gungs.find((item) => item.id === selectProgram['section-id']) : undefined;
    const instructorOptions = useMemo(() => instructor.map((obj) => {
        return {value: obj, label: obj.name}
    }), [])


    const onChangeGallerey = (active) => {
        setDataReserv({...dataReserv, personalGallery: active})
    }


    const onChangeProgram = (program, weapon) => {
        setDataReserv({
            ...dataReserv,
            program: program?.value ?? '',
            basicPrice: program?.value ? program?.value["base-price"] : 0,
            instructorPrice: program?.value ? dataReserv.dayType === 'weekday' ? Number(program?.value.instructor["weekday-price"]) : Number(program?.value.instructor["weekend-price"]) : 0,
            galleryPrice: program?.value ? dataReserv.dayType === 'weekday' ? Number(program?.value.gallery["weekday-price"]) : Number(program?.value.gallery["weekend-price"]) : 0
        });
        setErrors({...errors, program: ''})
    }

    const onChangeDayType = (day) => {
        setDataReserv({
            ...dataReserv,
            dayType: day,
            instructorPrice: Number(dataReserv.program ? dataReserv.program.instructor[`${day}-price`] : 0),
            galleryPrice: Number(dataReserv.program ? dataReserv.program.gallery[`${day}-price`] : 0)
        })
    }

    const onChangeDate = (dateReserved) => {
     setDataReserv({...dataReserv, date: dateReserved.selectDate, hourse: dateReserved.selectTime?.time})
    }

    const toReserved = () => {
        if(dataReserv.program) {
            setErrors({...errors, program: ''})
            setModal(true)
        }
        else {
            setErrors({
                program: 'Выберите программу'
            });
        }
    }

    const closeModal = (value) => {
        setModal(value);
    }

    const sumbitReservation = (inputData) => {

        axios.post(`${baseUrl}api/v1/reservation/create`, {
            "reservationType": "program",
            "program": dataReserv?.program?.id,
            "dayType": dataReserv?.dayType,
            "priceSum": priceSum,
            "shooterCount": dataReserv?.shooterCount,
            "instructor": dataReserv?.instructor ? dataReserv?.instructor?.value?.id : '',
            "personalGallery": dataReserv.personalGallery ? 'Y' : 'N',
            "date": dataReserv?.date,
            "hours": dataReserv?.hourse,
            "fullName": inputData?.fullName,
            "email": inputData?.email,
            "phone": inputData?.phone
        }).then(res => {
            if(res.data.status === "success") {
                onChangeAlert({
                    show: true,
                    error: '',
                    title: 'бронирование успешно',
                    status: true
                })
                setModal(false);
                onChangeShow(false);
            }
            if(res.data.status === "error") {
                onChangeAlert({
                    show: true,
                    error: '',
                    title: 'К сожалению, вас опередили, попробуйте выбрать другое время.',
                    status: false
                })
                onChangeShow(false)
            }
        });
    }



    return (
             <Fragment>
                <p className="text-white text-[16px] opacity-50 mb-[20px]">Выберите день посещения</p>
                <div>
                    <ProgramAndGung allProgram={allProgram} errors={errors} selectProgram={selectProgram} selectGung={selectGung}  onChangeProgram={onChangeProgram}  data={gungs}/>
                    <div className="mb-[31px]">
                        <div className="flex gap-x-[13px] mb-[31px]">
                            <button onClick={() => onChangeDayType('weekday')} className={`btn-catalog basis-[184px] ${dataReserv.dayType === 'weekday' ? "tabs__caption_active"  : ''}`}>
                                <span className="btn-link__text text-[14px] sm:text-[17px]">Будни</span>
                            </button>
                            <button onClick={() => onChangeDayType('weekend')} className={`btn-catalog basis-[184px] ${dataReserv.dayType === 'weekend' ? "tabs__caption_active"  : ''}`}>
                                <span className="btn-link__text text-[14px] sm:text-[17px] ">Выходные</span>
                            </button>
                        </div>
                        <div className="flex gap-x-[13px] mb-[31px] person">
                            {
                                person.map((item, idx) => {
                                    return (
                                        <button key={idx} onClick={() => setDataReserv({...dataReserv, shooterCount: item})}
                                        className={`${dataReserv.shooterCount === item ? 'text-[#0F0F0F] bg-[#B8AA91] border-transparent opacity-100' : 
                                            'hover:border-[#B8AA91] border-white border-opacity-[0.4] hover:border-opacity-100 hover:text-[#B8AA91] ' +
                                            'hover:opacity-100  text-white  opacity-[0.4]'} transition-all px-6 py-4 text-[14px] sm:text-[17px] border border-solid`
                                        }>
                                            {item}</button>
                                    )
                                })
                            }
                        </div>
                        <div className="">
                            <div className="daysContent">
                                <div className="flex justify-between mb-[12px]">
                                    <p className="text-white text-[14px] sm:text-[18px] font-normal leading-5">Базовая стоимость</p>
                                    <div data-cost="basic">
                                        <span className="text-[14px] sm:text-[18px] text-white font-normal leading-5 opacity-50">
                                            {dataReserv.basicPrice.toLocaleString()} р.
                                        </span>
                                    </div>
                                </div>
                                {/*<div className="flex justify-between">*/}
                                {/*    <p className="text-white text-[18px] font-normal leading-5">Стоимость выстрелов</p>*/}
                                {/*    <div data-cost="shots"><span className=" text-[14px] text-[rgba(255,_255,_255,_0.50)] line-through">10 р</span> <span className="text-[18px] text-[#B8AA91] font-normal leading-5">{Number(dataReserv.shoatsPrice).toLocaleString()} р.</span></div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#282828] mb-9"></div>
                    <div className="flex flex-col gap-y-[11px] mb-[31px]">
                        <div className="flex flex-col gap-y-5">
                            <ButtonChecked className={'flex justify-between'} onClick={(active) => {
                                setDataReserv({...dataReserv, personalInstructor: active})
                            }}>
                                <span className={" btn__content"}>
                                    Персональный инструктор
                                </span>
                                <span className={" btn__content"}>
                                    {dataReserv.instructorPrice ? `+ ${dataReserv.instructorPrice.toLocaleString()} р.` : ''}
                                </span>
                            </ButtonChecked>
                            {
                                dataReserv.personalInstructor ? <Select options={instructorOptions} onChange={(item) => {
                                    setDataReserv({...dataReserv, instructor: item})
                                }} select={dataReserv.instructor} title={"Выбрать интсруктора"}/> : ''
                            }
                            <ButtonChecked className="flex justify-between" onClick={onChangeGallerey}>
                                <span className="btn__content">
                                    Персональная галерея
                                </span>
                                <span className="btn__content">
                                    {dataReserv.galleryPrice ? `+ ${dataReserv.galleryPrice.toLocaleString()} р.` : ''}</span>
                            </ButtonChecked>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-[21px]">
                        <p className="text-[18px] text-white">Итого</p>
                        <p className="text-[18px] text-white totalAmout">{priceSum.toLocaleString()} р.</p>
                    </div>
                    <div className="flex justify-end md:justify-end md:gap-x-[13px]">
                        {/*<button className="btn-catalog"><span*/}
                        {/*    className="btn-link__text">В подарок</span></button>*/}
                        <button onClick={toReserved} className="btn__custom group sm:hover:bg-[#B9AB91] px-[25x] py-[14px] bg-transparent border border-[#2D2D2B]">
                            <span className="absolute w-[24px] h-[24px] top-0 left-0 border-t border-[#B8AA91] group-hover:opacity-0 border-l transition-opacity opacity-100"></span>
                            <span className="absolute w-[24px] h-[24px] bottom-0 left-0 -rotate-90 border-t border-[#B8AA91] border-l group-hover:opacity-0 transition-opacity opacity-100"></span>
                            <span className="absolute w-[24px] h-[24px] top-0 right-0 border-t border-[#B8AA91] border-r transition-opacity group-hover:opacity-0 opacity-100"></span>
                            <span className="absolute w-[24px] h-[24px] bottom-0 rotate-90 right-0 border-t border-[#B8AA91] border-r transition-opacity group-hover:opacity-0 opacity-100"></span>
                            <span className="btn__content group-hover:text-[#0F0F0F]">К бронированию</span>
                        </button>
                        <Modal showModal={modal} onChangeShow={closeModal}>
                            <div onClick={() => closeModal(false)} className="flex justify-end items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <g clipPath="url(#clip0_413_26368)">
                                        <rect width="2.88763" height="10.8286" rx="1.44382" transform="matrix(0.707069 -0.707145 0.707069 0.707145 1.00391 3.55273)" fill="white"/>
                                        <rect width="2.88763" height="10.8286" rx="1.44382" transform="matrix(0.707069 0.707145 -0.707069 0.707145 20.3887 1.51099)" fill="white"/>
                                        <rect width="2.88763" height="10.8286" rx="1.44382" transform="matrix(-0.707069 0.707145 -0.707069 -0.707145 22.4316 20.9119)" fill="white"/>
                                        <rect width="2.88763" height="10.8286" rx="1.44382" transform="matrix(-0.707069 -0.707145 0.707069 -0.707145 3.00977 22.9529)" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_413_26368">
                                            <rect width="22.12" height="22.12" fill="white" transform="translate(0.439453 0.959961)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <ModalReserved dayType={dataReserv.dayType} sumForm={priceSum} onChangeDate={onChangeDate} sumbitReservation={sumbitReservation}/>
                            <InputForm sumbitReservation={sumbitReservation} sumForm={priceSum}/>
                        </Modal>
                    </div>
                </div>
            </Fragment>
    )
}


