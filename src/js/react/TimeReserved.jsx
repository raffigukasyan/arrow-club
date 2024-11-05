import React from "react";

export default function TimeReserved({dataTime, activeTime, broneTime, onChangeTime}) {

    return (
        <div className="grid grid-cols-5 gap-x-0 sm:gap-x-5">
            {dataTime.map((data, idx) => {
                return <button key={data.id}
                               onClick={() => activeTime?.id === data.id ? onChangeTime(undefined) : onChangeTime(data)}
                               className={`${activeTime?.id === data.id ? 'active' : ''} ${broneTime?.includes(data.time) ? "pointer-events-none text-[#3A3A3A]" : ""} btnTime`}>{data.time}</button>
            })}
        </div>
    )
}