import React from "react";
import {useState, useMemo, useEffect} from "react";
import {AddCartidges} from "./ReservedComponent.jsx";
import Select from "../Select.jsx";

export default function WeaponsAndCartridges({onChange, weapons, currentWeaponsNumber, currentSelectWeapons}) {

    const isSelectedWeapons = (selectWeapons) => {
        if (selectWeapons === undefined) return false;
        else if (!selectWeapons.some((obj) => Object.keys(obj.weaponSelect).length)) return false
        return true
    }


    const weaponsOptions = useMemo(() => {
        if (!isSelectedWeapons(currentSelectWeapons)) return weapons?.map((item) => ({value: item, label: item.name}))
        let selectWeaponValues = currentSelectWeapons.map((obj) => obj.weaponSelect).flatMap(obj => obj.value)
        return weapons.filter((obj) => !selectWeaponValues.includes(obj)).map((item) => ({
            value: item,
            label: item.name
        }))
    }, [weapons, currentSelectWeapons])


    useEffect(() => {
        if (!isSelectedWeapons(currentSelectWeapons)) return
        onChange("currentSelectWeapons", currentSelectWeapons.map(obj => ({weaponSelect: {}})))
    }, [weapons])


    const changeWeapon = (select, idx) => {

        const updateSelect = [...currentSelectWeapons];
        updateSelect[idx].weaponSelect = select
        updateSelect[idx].cartridges = {
            shotCount: select?.value?.cartridges["min-amount"],
            initalCartidgesStepPrice: select?.value?.cartridges["min-price"]
        }


        onChange("currentSelectWeapons", updateSelect)
        // onChange("currentSelectWeapons", currentSelectWeapons.reduce((acc, el, elIdx) => {
        //     if (elIdx === idx) return [...acc, {["weaponSelect"]: select, ["cartridges"]: {shotCount: select?.value?.cartridges["min-amount"], initalCartidgesStepPrice: select?.value?.cartridges["min-price"]}}]
        //     return [...acc, el]
        // }, []))
    }

    const onChangeCartridges = (currentCartridges, currentWeaponIdx) => {
        const updatedWeapons = [...currentSelectWeapons]
        updatedWeapons[currentWeaponIdx].cartridges = currentCartridges
        onChange("currentSelectWeapons", updatedWeapons)
    }

    console.log(currentSelectWeapons)

    return (
        <div className="flex flex-col gap-y-5">
            {Array.from({length: currentWeaponsNumber}).map((item, idx) => {
                return (
                    <div key={idx}>
                        <Select options={weaponsOptions} onChange={(item) => changeWeapon(item, idx)}
                                select={currentSelectWeapons[idx]?.weaponSelect ?? {}} title="Выберите оружия"
                                className="mb-5"/>
                        {currentSelectWeapons[idx]?.weaponSelect?.value ?
                            <AddCartidges
                                onChange={(cartridges) => onChangeCartridges(cartridges, idx)}
                                cartidges={currentSelectWeapons[idx]?.weaponSelect?.value?.cartridges}/> : ''}
                    </div>
                )
            })}
        </div>
    )

}