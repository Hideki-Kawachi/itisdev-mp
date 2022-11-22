import React, {useState} from 'react'
import { Router, useRouter } from "next/router";

import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import BasicButton from '../../components/BasicButton';

import ItemCreate from '../../components/Items/ItemCreate';
import AddItemCategory from '../../components/Items/CategoryCreate';
import ItemTable from '../../components/Items/ItemTable'

function Items() {
    const router = useRouter();

    const [categoryPopupOn, setCategoryPopupOn] = useState(false)
    const [brandPopupOn, setBrandPopupOn] = useState(false)
    const [unitPopupOn, setUnitPopupOn] = useState(false)


    return (
        <>
            <Header page={"ITEMS"} subPage={"ADD ITEM"} user={"Example N. Name"}></Header>
            <NavBar></NavBar>
            <div id="main-container">
                {categoryPopupOn ? (
                    <>
                        <div className="item-modal-bg">
                            <AddItemCategory trigger={categoryPopupOn} setTrigger={setCategoryPopupOn}></AddItemCategory>
                        </div>
                        <ItemCreate trigger={categoryPopupOn} setTrigger={setCategoryPopupOn}/>
                    </> 
                ) : (
                    <div className="main-container-bg">
                        <ItemCreate trigger={categoryPopupOn} setTrigger={setCategoryPopupOn}/>
                    </div> 
                )}
               
                
            </div>
            
            
        </>
    )
}

export default Items;
