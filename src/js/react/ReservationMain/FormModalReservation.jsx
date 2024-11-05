import React, {useState, useEffect, Fragment, useMemo} from "react";
import { createRoot } from 'react-dom/client';
import Modal from "../components/Modal.jsx";
import Reservation from "../Reservetion.jsx";
import axios from "axios";
import Alert from "../components/Alert.jsx";
function FormModalReservation() {

    const [showModal, setShowModal] = useState({id: '', show:false});
    const [instructor, setInstructor] = useState([]);
    const [gungs, setGungs] = useState([]);
    const [loader, setLoader] = useState(false);
    const [showAlert, setShowAlert] = useState({
        show: false,
        error: '',
        title: '',
        status: false
    });


     useEffect(() => {
         stateModal.addcallback((value) => setShowModal(value));
     }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [instructorResponse, gungProgramResponse] = await Promise.all([
                    axios.post(`${baseUrl}api/v1/reservation/get-instructors`, {
                        body: JSON.stringify({})
                    }),
                    axios.post(`${baseUrl}api/v1/reservation/get-programs`, {
                        body: JSON.stringify({})
                    })
                ]);
                setInstructor(instructorResponse.data.data)
                setGungs(gungProgramResponse.data.data);
                // setBronDate(broneDateResponse.data.data);
            }
            catch (error) {
                console.log(error);
                alert("Ошибка при запросе данных")
            }
            setLoader(true);
        }
        fetchData()
    }, []);


    const allProgram = gungs.flatMap(obj => obj.program).filter((obj) => obj);

    const selectProgram = allProgram.find((item) => item.id === showModal.id)


    const onChangeAlert = (value) => {
        setShowAlert({...showModal, ...value})
    }

    const onChangeShow = (value) => {
        setShowModal({...showModal, show:value});
    }

    return (
        <Fragment>
            <Modal showModal={showModal.show} onChangeShow={onChangeShow}>
                <div onClick={() => onChangeShow(false)} className="flex justify-end items-center cursor-pointer mb-4">
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
                <h3 className="text-3xl lg:text-[20px] font-medium uppercase leading-6 text-white mb-[13px]">БРОНИРОВАНИЕ</h3>
                {loader ? <Reservation onChangeShow={onChangeShow} onChangeAlert={onChangeAlert} selectProgram={selectProgram}  allProgram={allProgram} gungs={gungs} instructor={instructor}/> : <div className="w-full flex justify-center items-center">
                    <img className="" src="/img/loader.svg" alt=""/>
                </div>}
            </Modal>
            <Modal showModal={showAlert.show} onChangeShow={onChangeAlert}>
                <div onClick={() => setShowAlert({...showAlert, show:false})} className="flex justify-end items-center cursor-pointer mb-4">
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
                <Alert title={showAlert.title} error={showAlert.error}/>
            </Modal>
        </Fragment>
    )
}



let domContainer = createRoot(document.querySelector('#modalRes'));
domContainer.render(<FormModalReservation />);