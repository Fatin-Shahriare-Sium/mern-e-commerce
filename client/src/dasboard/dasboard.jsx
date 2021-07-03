import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import SidebarSingle from '../sidebar/sidebar-single';
import './dasboard.css'
import dasboard from '../assets/dasboard.svg'
import add from '../assets/add.svg'
import list from '../assets/list.svg'
import order from '../assets/order.svg'
import AddProduct from '../add product/add-product';
import AllProduct from '../all product/all-product';
const Dasboard = () => {
    let [cValue, setcValue] = useState('dasboard')
    let history = useHistory()
    return (
        <BrowserRouter>

            <div className='dasboard'>
                <div className="dasboard-nav">
                    <Navbar />
                </div>
                <div className="dasboard-mainBox">

                    <div className="dasboard-mainBox--sidebar">
                        <SidebarSingle href='/dasboard' handleClick={() => setcValue('dasboard')} icon={dasboard} cValue={cValue} name={'dasboard'} />
                        <SidebarSingle href='/dasboard/addproduct' handleClick={() => setcValue('Add Product')} icon={add} cValue={cValue} name={'Add Product'} />
                        <SidebarSingle href='/dasboard/allproduct' handleClick={() => setcValue('All Product')} icon={list} cValue={cValue} name={'All Product'} />
                        <div onClick={() => history.push('/orderdetails')}>
                            <SidebarSingle href='/orderdetails' handleClick={() => setcValue('Orders')} icon={order} cValue={cValue} name={'Orders'} />
                        </div>


                    </div>
                    <div className="dasboard-mainBox--content">
                        <Switch>
                            <Route exact path='/dasboard/addproduct'>
                                <AddProduct />
                            </Route>

                            <Route path='/dasboard/allproduct'>
                                <AllProduct />
                            </Route>

                            <Route path='/dasboard/product/edit/:id'>
                                <AddProduct />
                            </Route>



                        </Switch>
                    </div>
                </div>



            </div>

        </BrowserRouter>
    )
}

export default Dasboard;
