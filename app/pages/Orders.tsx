'use client';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";


const Orders = () => {

    const [orders, setOrders] = useState([]);

    const deleteOrder = (id: string) => {
        axios.delete("/api/admin/order", {
            data: {
                id: id
            }
        }).then(res => {
            console.log(res.data);
        }).catch(error => console.log(error)
        )
    }

    const formatTimeStamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const time = date.toLocaleTimeString("en-US");
        return time;
    }

    useEffect(() => {
        axios.get("/api/admin/order").then(res => {
            setOrders(res.data.orders);
        })
    }, []);

  return (
    <div className='flex items-start justify-center w-full px-20'>
        <div className='grid grid-cols-3 gap-4 py-10'>
            {orders.map((order: any) => (
                <div className='bg-white bg-opacity-20 rounded-md p-4 ring-2 ring-blue-500 relative group flex flex-col items-center justify-start' key={order.id}>
                    <p className='font-semibold text-lg'>Table no: {order.tableNo}</p>
                    <p className='text-xs'>{formatTimeStamp(order.timestamp)}</p>
                    {order.items.map((item:any) => (
                        <div className='w-full flex items-center justify-between gap-2 text-sm' key={item.id}>
                            <h4>{item.name}</h4>
                            <p>{item.quantity}</p>
                        </div>
                    ))}
                    <div onClick={()=> deleteOrder(order.id)} className='absolute top-0 right-0 rounded-md w-8 h-8 hidden group-hover:flex items-center justify-center cursor-pointer z-10 hover:animate-pulse'>
                        <MdDelete color='red'/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Orders