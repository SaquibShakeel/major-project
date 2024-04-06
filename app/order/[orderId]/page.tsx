import OrderPage from '../../pages/OrderPage';
import React from 'react'

interface PageProps {
    params: {
      orderId: string;
    };
  }

const page = ({ params }: PageProps) => {

    const {orderId} = params;
    
  return (
    <OrderPage orderId={orderId} />
  )
}

export default page