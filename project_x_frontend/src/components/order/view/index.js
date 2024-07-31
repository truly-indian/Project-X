import React, { useEffect, useState } from "react";
import Table from "@/components/common/Table";
import { fetchOrders } from '@/services/order';

const OrderView = () => {
    const [orders, setOrders] = useState([]);
    const tableHeads = ['Shipment Name', 'Pickup Point', 'Drop Point', 'Distance'];

    useEffect(() => {
        (async () => {
            const result = await fetchOrders();
            setOrders(result?.data || []);
            const formattedOrders = result?.data.map((order, index) => {
                delete order._id;
                return order;
            });
            setOrders(formattedOrders);
        })();
    }, []);

    return (
        <div style={{ padding: '1rem', margin: '100px 50px 50px 20px', border: '2px solid red' }}>
            <Table tableHeads={tableHeads} tableRows={orders || []}></Table>
        </div>
    );
};

export default OrderView;