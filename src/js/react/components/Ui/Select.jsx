import React, {useState} from "react";
import {Listbox} from "@headlessui/react";
export default function Select({options, title}) {

    const [selected, setSelected] = useState();

    console.log(selected)
    return (
        <Listbox defaultValue={'Выберите оружия'} onChange={setSelected}>
            <Listbox.Button className={'relative w-full flex justify-between  py-[14px] px-[15px] sm:px-[25px]  border border-white border-opacity-20 cursor-pointer transition-[0.3s] bg-[#181818]'}>{selected?.label ?? title}</Listbox.Button>
            <Listbox.Options className={'py-3 bg-[#1A1A19] absolute border border-[#2F2F2F] transition-[0.2s]  z-[99999] shadow-[0px_43px_26px_0px_rgba(0,_0,_0,_0.37)] text-white top-[56px] left-[50%] w-full -translate-x-2/4 opacity-0 invisible'}>
                {options.map((option) => (
                    <Listbox.Option
                        key={option.value.id}
                        value={option}
                        // disabled={option.unavailable}
                    >
                        {option.value.name}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    )
}