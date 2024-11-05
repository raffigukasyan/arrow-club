import React from "react";
import {useForm} from "react-hook-form";
import InputMask from 'react-input-mask';
export default function InputForm({sumForm, sumbitReservation}) {

    const { register, handleSubmit, formState:{errors} } = useForm();

    const onSubmit = (data) => {
        sumbitReservation(data);
    }



    return (
        <>
            <div className="mb-6">
                <div>
                    <input
                        type="text"
                        {...register("fullName", {required: true, maxLength: 20})}
                        placeholder="ФИО"
                        className="w-full py-[20px] border-b border-[#3A3A3A] bg-transparent outline-none ring-offset-0 placeholder-[#878787] text-[#878787] text-[16px]" />
                    {errors.fullName?.type === 'required' && <p className="text-red-500 pt-2">Введите имя</p>}
                </div>
                <div>

                    <InputMask mask="+7 (999) 999-99-99" maskChar=""
                               placeholder="Номер телефона"
                               className={"w-full py-[20px] border-b border-[#3A3A3A] bg-transparent outline-none ring-offset-0 placeholder-[#878787] text-[#878787] text-[16px]"}
                               {...register("phone", {required: true})}/>
                    {errors.phone?.type === 'required' && <p className='text-red-500 pt-2'>Введите номер телефона</p>}
                </div>
                <div>
                    <input
                        {...register("email", {required: true, pattern: /^\S+@\S+\.\S+$/ })}
                        placeholder="E-mail"
                        className="w-full py-[20px] border-b border-[#3A3A3A] bg-transparent outline-none ring-offset-0 placeholder-[#878787] text-[#878787] text-[16px]" />
                        <p className='text-red-500 pt-2'>
                            {errors.email?.type === 'required' && 'Введите Email'}
                            {errors.email?.type === 'pattern' && 'Введите корректный Email'}
                        </p>
                </div>
            </div>
            <div className="bg-[#1C1C1A] px-[17px] py-4">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-white text-[18px] font-normal">Итого</p>
                    <p className="text-white text-[18px] font-normal totalAmout">{sumForm.toLocaleString()} ₽</p>
                </div>
                <div className="flex justify-center gap-x-5 items-center">
                    <button onClick={handleSubmit(onSubmit)} className="btn__custom w-full group hover:bg-[#B9AB91] bg-transparent border border-[#2D2D2B]" data-filter="false">
                        <span className="absolute w-[24px] h-[24px] top-0 left-0 border-t border-[#B8AA91] group-hover:opacity-0 border-l transition-opacity opacity-100"></span>
                        <span className="absolute w-[24px] h-[24px] bottom-0 left-0 -rotate-90 border-t border-[#B8AA91] border-l group-hover:opacity-0 transition-opacity opacity-100"></span>
                        <span className="absolute w-[24px] h-[24px] top-0 right-0 border-t border-[#B8AA91] border-r transition-opacity group-hover:opacity-0 opacity-100"></span>
                        <span className="absolute w-[24px] h-[24px] bottom-0 rotate-90 right-0 border-t border-[#B8AA91] border-r transition-opacity group-hover:opacity-0 opacity-100"></span>
                        <span className="btn__content group-hover:text-[#0F0F0F]">Забронировать</span>
                    </button>
                </div>
            </div>
        </>
    )
}