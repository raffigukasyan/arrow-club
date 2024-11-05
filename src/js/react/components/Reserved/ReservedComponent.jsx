import React, {useEffect} from "react";
import {useState} from "react";

export const DayType = ({onChange}) => {
    const [dayType, setDayType] = useState('weekday');

    //console.log('RENDER DAYTYPE')
    return (
        <div className="flex gap-x-[13px] mb-[31px] mt-8">
            <button onClick={() => {
                setDayType('weekday');
                onChange('dayType', 'weekday')
            }} className={`btn-catalog basis-[184px] ${dayType === 'weekday' ? "tabs__caption_active" : ''}`}>
                <span className="btn-link__text text-[14px] sm:text-[17px]">Будни</span>
            </button>
            <button onClick={() => {
                setDayType('weekend')
                onChange('dayType', 'weekend')
            }} className={`btn-catalog basis-[184px] ${dayType === 'weekend' ? "tabs__caption_active" : ''}`}>
                <span className="btn-link__text text-[14px] sm:text-[17px] ">Выходные</span>
            </button>
        </div>
    )
}

export const CountParams = ({count, onChange, value}) => {
    return (
        <div className="flex gap-x-[13px] mb-[31px] person">
            {
                count.map((item, idx) => {
                    return (
                        <button key={idx}
                                onClick={() => onChange(item)}
                                className={`${value === item ? 'text-[#0F0F0F] bg-[#B8AA91] border-transparent opacity-100' : 'hover:border-[#B8AA91] border-white border-opacity-[0.4] hover:border-opacity-100 hover:text-[#B8AA91] hover:opacity-100  text-white  opacity-[0.4]'} transition-all px-6 py-4 text-[14px] sm:text-[17px] border border-solid`
                                }>
                            {item}
                        </button>
                    )
                })
            }
        </div>
    )
}

export const AddCartidges = ({onChange, cartidges}) => {
    const [cartidgesData, setCartidgesData] = useState({
        shotCount: cartidges["min-amount"] ?? 0,
        initalCartidgesStepPrice: cartidges["min-price"] ?? 0
    });

    const cartidgesAmount = cartidges["min-amount"] ?? 0;
    const cartidgesPrice = cartidges["min-price"] ?? 0;
    const cartidgesStep = cartidges["min-step"] ?? 0;
    const cartidgesStepPrice = cartidges["step-price"] ?? 0;

    useEffect(() => {
        setCartidgesData( {shotCount: cartidgesAmount,
            initalCartidgesStepPrice: cartidgesPrice})
    }, [cartidges]);

    const isDisabled = () => cartidgesData.shotCount <= cartidgesAmount

    const onIncrement = () => {

        const newCartidges = {shotCount: cartidgesData.shotCount + cartidgesStep,
            initalCartidgesStepPrice: cartidgesData.initalCartidgesStepPrice + cartidgesStepPrice}
        setCartidgesData(newCartidges);

        onChange(newCartidges)
    }

    const onDecrement = () => {
        if (!isDisabled()) {
            // setShotCount(shotCount - cartidgesStep)
            const newCartidges = {shotCount: cartidgesData.shotCount - cartidgesStep,
                initalCartidgesStepPrice: cartidgesData.initalCartidgesStepPrice - cartidgesStepPrice}
            setCartidgesData(newCartidges);
            onChange(newCartidges)
        }
    }

    return (
        <div className="flex justify-between gap-x-2 items-center">
            <button
                className={`addCartidges__btn ${isDisabled() ? 'text-white border border-white opacity-40 cursor-auto' : 'border border-[#B8AA91] text-[#B8AA91] hover:bg-[#B8AA91] hover:text-[#0F0F0F]'}`}
                onClick={onDecrement}>
                -{cartidgesStep}
            </button>
            <div className="text-white text-sm sm:text-lg sm:leading-5 text-center">{cartidgesData.shotCount.toLocaleString()} <br/> выстрелов</div>
            <button
                className={`addCartidges__btn border border-[#B8AA91] text-[#B8AA91] hover:bg-[#B8AA91] hover:text-[#0F0F0F]`}
                onClick={onIncrement}>
                +{cartidgesStep}
            </button>
            <div className="text-white">{cartidgesData.initalCartidgesStepPrice.toLocaleString()} руб.</div>
        </div>
    )
}

export const TotalAmount = ({amount}) => {

    return (
        <div className="flex justify-between items-center mb-5">
            <span className="text-white text-lg">Итого</span>
            <span className="text-white text-lg">{amount} р.</span>
        </div>
    )
}