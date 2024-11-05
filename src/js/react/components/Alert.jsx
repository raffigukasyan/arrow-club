import React from "react";
export default function Alert({title, error}) {
    return (
        <>
            <h3 className=" text-[20px] sm:text-3xl font-medium uppercase leading-6 text-white mb-[13px]">{title}</h3>
            <p className="text-[16px] text-white font-medium leading-5">{error}</p>
        </>
    )
}