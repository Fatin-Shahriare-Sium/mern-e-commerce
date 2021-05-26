import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import SidebarSingle from '../sidebar/sidebar-single';
import './dasboard.css'
import dasboard from '../assets/dasboard.svg'
import add from '../assets/add.svg'
import list from '../assets/list.svg'
import order from '../assets/order.svg'
import AddProduct from '../add product/add-product';
const Dasboard = () => {
    let[cValue,setcValue]=useState('dasboard')
    return (
        <BrowserRouter>
        
        <div className='dasboard'>
            <div className="dasboard-nav">
                <Navbar/>
            </div>
            <div className="dasboard-mainBox">

                <div className="dasboard-mainBox--sidebar">
                    <SidebarSingle href='/dasboard' handleClick={()=>setcValue('dasboard')} icon={dasboard} cValue={cValue} name={'dasboard'}/>
                    <SidebarSingle href='/dasboard/addproduct' handleClick={()=>setcValue('Add Product')} icon={add} cValue={cValue} name={'Add Product'}/>
                    <SidebarSingle handleClick={()=>setcValue('All Product')} icon={list} cValue={cValue} name={'All Product'}/>
                    <SidebarSingle handleClick={()=>setcValue('Orders')} icon={order} cValue={cValue} name={'Orders'}/>


                </div>
                <div className="dasboard-mainBox--content">
        <Switch>
                <Route exact path='/dasboard/addproduct'>
                    <AddProduct/>
                </Route>



                

        </Switch>
        </div>
            </div>

        
            
        </div>
        
        </BrowserRouter>
    )
}

export default Dasboard;
