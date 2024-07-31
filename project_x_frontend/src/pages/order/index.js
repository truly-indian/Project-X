"use client";
import React from "react";
import OrderView from "@/components/order/view";
import RootLayout from "@/app/layout";

const OrderPage = () => {
    return (
        <RootLayout>
            <OrderView></OrderView>
        </RootLayout>
    );
};

export default OrderPage;