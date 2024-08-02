import React, { useEffect, useState } from "react";
import Table from "@/components/common/Table";
import { fetchOrders } from '@/services/order';
import SimpleButton from "@/components/common/Button";
import { useRouter } from "next/navigation";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const router = useRouter();
    const tableHeads = ['Shipment Name', 'Pickup', 'Drop', 'Distance In Kms', 'Quoted Price' , 'Options'];

    const goToOrderViewPage = (orderId) => {
        router.push(`/order/edit?order_id=${orderId}`);
    }

    const formatOrderList = (ordersList) => {
        const formattedOrders = ordersList?.data?.orders.map((order, index) => {
            const orderId = order._id;
            return {
                "Shipment Name": order.shipmentName,
                "Pickup": order.pickup,
                "Drop": order.drop,
                "Distance in Kms": order.distanceInKms,
                "Quoted Price": order.quotedPrice,
                "Options": [
                    <SimpleButton key="view" onClick={() => goToOrderViewPage(orderId)} size={'sm'} buttonText={'View Order Details'} />
                ]
            };
        });
        return formattedOrders;
    };

    const fetchOrdersWrapper = async (pageOptions) => {
        try {
            const ordersList = await fetchOrders(pageOptions.from, pageOptions.limit);
            const formattedOrders = formatOrderList(ordersList);
            setOrders(formattedOrders);
            let totalPageCounter;
            const totalOrders = ordersList?.data?.total;
            if (totalOrders % limit != 0) {
                totalPageCounter = Math.floor((totalOrders / limit) + 1);
            } else {
                totalPageCounter = (totalOrders / limit)
            }
            setTotalPage(totalPageCounter);

        } catch (error) {
            console.log('error while fethching pages: ', error);
        }
    };

    useEffect(() => {
        fetchOrdersWrapper({ from: 0, limit: 10, newPage: 0 })
    }, []);
    const from = 0;
    const limit = 10;
    const pagination = { rowsPerPage: 10, from };
    const meta = {
        limit,
        pagination,
        triggerMethod: fetchOrdersWrapper
    }

    return (
        <div style={{ padding: '1rem', margin: '100px 50px 50px 20px'}}>
            <Table meta={meta} totalCount={totalPage} tableHeads={tableHeads} tableRows={orders || []}></Table>
        </div>
    );
};

export default OrderList;