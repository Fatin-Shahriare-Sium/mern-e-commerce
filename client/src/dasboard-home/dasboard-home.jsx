import React, { useEffect, useState } from 'react'
import useUrl from '../hooks/useUrl.jsx'
import SingleOrderSidebar from '../order/single-order-sidebar.jsx'
import { Link, useHistory } from 'react-router-dom'
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
            {recentOrders.map(sig => <a href={`/orderdetails/${sig._id}`}>
                <SingleOrderSidebar id={sig._id} date={sig.createdAt} totalAmount={sig.totalAmount} selectedId={''} handleSelector={() => { }} paymentStatus={sig.paymentStatus} orderStatus={sig.orderStatus} />
            </a>)}
        </div>
    )
}

export default DasboardHome;
