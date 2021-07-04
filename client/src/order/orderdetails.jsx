import React, { useEffect, useState } from 'react'
import useUrl from '../hooks/useUrl.jsx';
import SingleOrderSidebar from './single-order-sidebar.jsx'
import OrderdetailsSidebarOffcanvas from './orderdetails-sidebar-offcanvas';
import SingleOrderShippingAddress from './single-order-shippingAddress.jsx'
import SingleOrderProduct from './single-order-product.jsx'
import SingleOrderTimeline from './single-order-timeline.jsx';
import menuIcon from '../assets/menu.svg'
import SingleOrderSummery from './single-order-summery';
// import SingleOrderProduct from '../component/single-order-product';
// import SingleOrderTimeline from '../component/single-order-timeline';
// import SingleOrderShippingAddress from '../component/single-order-shippingAddress.jsx';
// import OrderdetailsSidebarOffcanvas from '../component/orderdetails-sidebar-offcanvas';
const OrderDetails = () => {
    let { url } = useUrl()
    let [orders, setOrders] = useState([])
    let [selectedOrder, setSelectedOrder] = useState()
    let [selectedId, setSelectedId] = useState('')
    let [orderSlider, setOrderSlider] = useState(false)
    let [edit, setEdit] = useState(false)
    let [updateStatus, setUpdateStatus] = useState({ payment: '', order: '' })
    let [error, setError] = useState({ msg: '', color: '' })

    useEffect(() => {


        fetch(`${url}/order/fetchAll`, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setOrders(data.allOrder)
            })


    }, [])

    useEffect(() => {

        if (selectedOrder) {

            setUpdateStatus({ payment: selectedOrder.paymentStatus, order: selectedOrder.orderStatus })

        }

    }, [selectedOrder])




    function sentUpdateData(preTime) {
        console.log('sentUpdateData');
        fetch(`${url}/order/update/${selectedOrder._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                updateStatus,
                preTime
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }



    function handleUpdate() {
        if (updateStatus.order == 'pending') {
            let preTime = {
                prePendingTime: selectedOrder.orderTimeline[0] ? selectedOrder.orderTimeline[1].time : new Date().toLocaleString()
            }
            return sentUpdateData(preTime)
        } else if (updateStatus.order == 'processing') {
            let preTime = {
                prePendingTime: selectedOrder.orderTimeline[0] ? selectedOrder.orderTimeline[1].time : new Date().toLocaleString()
            }
            return sentUpdateData(preTime)

        } else if (updateStatus.order == 'shipped') {

            let preTime = {
                prePendingTime: selectedOrder.orderTimeline[0] ? selectedOrder.orderTimeline[0].time : new Date().toLocaleString(),
                preProcessingTime: selectedOrder.orderTimeline[1] ? selectedOrder.orderTimeline[1].time : new Date().toLocaleString()
            }
            return sentUpdateData(preTime)
        } else if (updateStatus.order == 'deliverd') {
            let preTime = {
                prePendingTime: selectedOrder.orderTimeline[0] ? selectedOrder.orderTimeline[0].time : new Date().toLocaleString(),
                preProcessingTime: selectedOrder.orderTimeline[1] ? selectedOrder.orderTimeline[1].time : new Date().toLocaleString(),
                preShippedTime: selectedOrder.orderTimeline[2] ? selectedOrder.orderTimeline[2].time : new Date().toLocaleString()

            }
            return sentUpdateData(preTime)
        }

    }

    function isNeedToUpdateOrder() {
        console.log(updateStatus);
        if (updateStatus.payment == selectedOrder.paymentStatus && updateStatus.order == selectedOrder.orderStatus) {
            console.log('isNeedToUpdateOrdefunxc call');
            setError({
                msg: 'No need to Update',
                color: 'warning'
            })
            console.log('No need to Update');
        } else {
            handleUpdate()
            toogleEdit()
            return setError({
                msg: 'successfully Updated',
                color: 'success'
            })
        }
    }


    function toogleEdit() {
        setEdit(pre => !pre)
    }

    let handleSelectedId = (id) => {
        setSelectedId(id)
        setSelectedOrder(orders.find(sig => sig._id == id))

    }

    let handleOrderSlider = () => {
        setOrderSlider(pre => !pre)
    }

    return (
        <div className='order-details__container container-fluid mt-3'>

            <div className='row'>
                {orderSlider && <OrderdetailsSidebarOffcanvas show={orderSlider} handleSlider={handleOrderSlider}>
                    {orders.map(sig => <SingleOrderSidebar id={sig._id} date={sig.createdAt} totalAmount={sig.totalAmount} selectedId={selectedId} handleSelector={handleSelectedId} paymentStatus={sig.paymentStatus} orderStatus={sig.orderStatus} />)}
                </OrderdetailsSidebarOffcanvas>}
                <div style={{ overflowY: 'auto', borderRight: '2px solid red', height: '100vh' }} className='order-details__sidebar col-md-3'>
                    {orders.map(sig => <SingleOrderSidebar id={sig._id} date={sig.createdAt} totalAmount={sig.totalAmount} selectedId={selectedId} handleSelector={handleSelectedId} paymentStatus={sig.paymentStatus} orderStatus={sig.orderStatus} />)}

                </div>
                <div style={{ overflowY: 'auto', height: '100vh' }} className='order-details__shower col-md-9'>
                    <img className='oders-details-menubar m-1' onClick={() => handleOrderSlider()} style={{ width: "13px", cursor: "pointer" }} src={menuIcon} alt='' />
                    {!selectedOrder && <div className='order-empty-msg'>
                        <p>please,select one to see the details</p>
                    </div>}
                    {selectedOrder && <SingleOrderShippingAddress address={selectedOrder.address} />}
                    {selectedOrder && < SingleOrderSummery order={selectedOrder} />}

                    {/* Changing Payment Status start */}

                    {edit && <div style={{ display: 'flex', width: '90%', margin: '3% auto', fontSize: '1.5rem' }}>
                        <p>Change Payment Status:</p>
                        <select value={updateStatus.payment} onChange={(event) => setUpdateStatus({ ...updateStatus, payment: event.target.value })} id='payment-select' className='ms-3'>
                            <option value="verifing">Verifing</option>
                            <option value="verified">Verified</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>}

                    {/* Changing Payment Status end */}
                    {selectedOrder && <SingleOrderProduct orderedProduct={selectedOrder.product} paymentStatus={selectedOrder.paymentStatus} totalAmount={selectedOrder.totalAmount} />}

                    {selectedOrder && <SingleOrderTimeline orderTimeline={selectedOrder.orderTimeline} />}


                    {/* Changing Order Status start */}

                    {edit && <div style={{ display: 'flex', width: '90%', margin: '3% auto', fontSize: '1.5rem' }}>
                        <p>Change Order Status:</p>
                        <select value={updateStatus.order} onChange={(event) => setUpdateStatus({ ...updateStatus, order: event.target.value })} id='order-select' className='ms-3'>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="deliverd">Deliverd</option>
                        </select>
                    </div>}

                    {/* Changing order Status end */}

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='mt-5'>
                        {edit ?
                            <button onClick={isNeedToUpdateOrder} className='btn btn-outline-success w-50'>Update</button>
                            : <button onClick={() => toogleEdit()} className='btn btn-outline-primary w-50'>Edit</button>}
                    </div>
                    <div style={{ height: '10vh' }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;
