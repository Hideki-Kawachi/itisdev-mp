import React, {useState} from 'react'
import { Router, useRouter } from "next/router";

import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import BasicButton from '../../components/BasicButton';

function Items() {
    const router = useRouter();
    return (
        <>
            <Header page={"ITEMS"} subPage={"ADD ITEM"} user={"Example N. Name"}></Header>
            <NavBar></NavBar>
            <div id="main-container">
                <div className="main-container-bg">
                ADD ITEM
                </div>
            </div>
        </>
    )
}

export default Items;
