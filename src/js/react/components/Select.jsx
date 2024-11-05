import React, {useEffect, useState} from "react";
import ButtonChecked from "./ButtonChecked.jsx";

export default function Select({options, onChange, className, select, title}) {
    const [open, setOpen] = useState(false);
    const [selectOption, setSelectOption] = useState(select);

    useEffect(() => {
        if (select === undefined) return;
        if (Object.values(select).length) return
        setSelectOption({})
    }, [select]);

   // console.log("RENDER SELECT", selectOption)
    return (
        <div className={`${className} selectCustom`}>
            <div onClick={() => setOpen(!open)} className="select">
                <span className={`${open ? 'select-clicked' : ''} selected text-[14px] sm:text-[17px]`}>{ selectOption?.label ?? title}</span>
                <div className={`${open ? 'caret-rotate' : ''} caret`}></div>
            </div>
            <ul className={`${open ? 'menu-open' : ''} menu min-h-[50px] max-h-[200px] scrollCustom overflow-y-scroll menuReserved`}>
                { options ?
                    options.map((item, idx) => {
                        return <li key={idx} onClick={() => {
                            setOpen(!open);
                            setSelectOption(item)
                            onChange(item);
                        }} className={`${item.value.id === selectOption?.id ? 'active' : ''} text-[14px] sm:text-[16px] break-words`}>{item.label}</li>
                    })
                    : <div className="text-center">Пусто</div>}
            </ul>
        </div>
    )
}

