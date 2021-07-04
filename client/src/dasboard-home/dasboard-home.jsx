import React, { useEffect, useState } from 'react'
import useUrl from '../hooks/useUrl.jsx'
import SingleOrderSidebar from '../order/single-order-sidebar.jsx'
import { Link, useHistory } from 'react-router-dom'
import DasboardCard from '../dasboard-card/dasboard-card.jsx'
const DasboardHome = () => {
    let { url } = useUrl()
    let history = useHistory()
    let [recentOrders, setRecentOrders] = useState([])
    useEffect(() => {
        fetch(`${url}/order/recent`, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                setRecentOrders(data.recentOrders)
                console.log(data);
            })
    }, [])
    // onClick={() => history.push(`/orderdetails/${sig._id}`)}
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DasboardCard headline='All User' text='1000' />
                <DasboardCard headline='All Orders' text='7000' />

            </div>
            <p style={{ fontSize: '2rem', fontWeight: '500', margin: '3% 1%' }}>Recent Orders</p>
            {recentOrders.map(sig => <a href={`/orderdetails/${sig._id}`}>
                <SingleOrderSidebar id={sig._id} date={sig.createdAt} totalAmount={sig.totalAmount} selectedId={''} handleSelector={() => { }} paymentStatus={sig.paymentStatus} orderStatus={sig.orderStatus} />
            </a>)}
        </div>
    )
}

export default DasboardHome;
