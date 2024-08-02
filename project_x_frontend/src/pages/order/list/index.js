"use client";
import React from "react";
import OrderList from "@/components/order/list";
import RootLayout from "@/app/layout";

const OrderPage = () => {
    return (
        <RootLayout>
            <OrderList></OrderList>
        </RootLayout>
    );
};

export default OrderPage;