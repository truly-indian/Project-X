"use client";
import React, {useEffect} from "react";
import OrderEdit from "@/components/order/edit";
import RootLayout from "@/app/layout";
import { useSearchParams } from 'next/navigation'

const OrderPage = () => {
    const searchParams = useSearchParams()

    return (
        <RootLayout>
            <OrderEdit orderId={searchParams.get('order_id')}></OrderEdit>
        </RootLayout>
    );
};

export default OrderPage;