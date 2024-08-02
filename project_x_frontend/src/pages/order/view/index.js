"use client";
import React, {useEffect} from "react";
import OrderView from "@/components/order/view";
import RootLayout from "@/app/layout";
import { useSearchParams } from 'next/navigation'

const OrderPage = () => {
    const searchParams = useSearchParams()

    return (
        <RootLayout>
            <OrderView orderId={searchParams.get('order_id')}></OrderView>
        </RootLayout>
    );
};

export default OrderPage;