import React, {useEffect, useMemo, useState} from "react";
import Select from "./components/Select.jsx";
export default function ProgramAndGung({data, selectProgram, errors, selectGung, allProgram, onChangeProgram}) {
    const [selectGun, setSelectGun] = useState(selectGung ? {value: selectGung, label:selectGung.name} : undefined);
    const [changeProgram, setChangeProgram] = useState(selectProgram ? {value: selectProgram, label: selectProgram.name} : undefined);

    const programOptions = useMemo(() => {
        if(!selectGun) {
            return allProgram.map(obj => ({value: obj, label: obj.name}))
        }
        else if (selectGun.value.program) {
            return selectGun.value.program.map(obj => ({value: obj, label: obj.name}))
        }
        else {
            return false;
        }
    }, [selectGun]);




    const gungsOptions = data.map((obj) => {
        return {
            value: {...obj}, label: obj.name
        }
    });

    return (
        <div className="mb-[20px]">
            <Select options={gungsOptions} select={selectGun}  onChange={(item) => {
                setSelectGun(item);
                setChangeProgram({});
                onChangeProgram(undefined)
            }} className={"mb-5"} title={"Выбрать оружие"}/>
            <Select options={programOptions} onChange={(item) => {
                setChangeProgram(item);
                setSelectGun(gungsOptions.find((obj) => obj.value.id === item.value['section-id']))
                onChangeProgram(item, selectGun)
            }} select={changeProgram}  title={"Выбрать программу"}/>
            {errors?.program ? <span className="block pl-1 pt-2 text-red-500">{errors.program}</span> : ''}
        </div>
    )
}