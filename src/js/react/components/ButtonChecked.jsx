import React, {useState} from "react";
export default function ButtonChecked({children, onClick, className}) {
    const [active, setActive] = useState(false);

    return (
        <button onClick={() => {
            setActive(!active);
            onClick(!active);
        }}
                className={`${className} ${active ? 'active' : ''} btn__custom sm:hover:active w-full py-[15px] px-[13px] sm:px-[18px] bg-transparent border border-[#2D2D2B]`}>
            <span className="absolute w-[24px] h-[24px] top-0 left-0 border-t border-[#B8AA91] border-l border-[#B8AA91]"></span>
            <span className="absolute w-[24px] h-[24px] bottom-0 left-0 -rotate-90 border-t border-[#B8AA91] border-l border-[#B8AA91]"></span>
            <span className="absolute w-[24px] h-[24px] top-0 right-0 border-t border-[#B8AA91] border-r border-[#B8AA91]"></span>
            <span className="absolute w-[24px] h-[24px] bottom-0 rotate-90 right-0 border-t border-[#B8AA91] border-r border-[#B8AA91]"></span>
            {children}
        </button>
    )
}