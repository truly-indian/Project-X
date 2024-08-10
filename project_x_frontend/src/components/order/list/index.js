import React, { useEffect, useState } from "react";
import Table from "@/components/common/Table";
import { fetchOrders } from '@/services/order';
import SimpleButton from "@/components/common/Button";
import { useRouter } from "next/navigation";
import SimpleSpinner from "@/components/common/Spinner";

const spinnerContainerStyle = {
    position: 'fixed', // Make the spinner container cover the entire viewport
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.5)' // O
};

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [showSpinner, setShowSpinner] = useState(false);
    const router = useRouter();
    const tableHeads = ['Shipment Name', 'Pickup', 'Drop', 'Distance In Kms', 'Quoted Price' , 'Options'];

    const RouteToPage = (path, timeout=2000) => {
        setTimeout(() => {
            router.push(path);
            setShowSpinner(false);
        }, timeout);
    }

    const goToOrderViewPage = (orderId) => {
        setShowSpinner(true);
       RouteToPage(`/order/edit?order_id=${orderId}`);
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
                    <SimpleButton key="view" onClick={() => goToOrderViewPage(orderId)} size={'sm'} buttonText={'View Order and Quote'} />
                ]
            };
        });
        return formattedOrders;
    };

    const fetchOrdersWrapper = async (pageOptions) => {
        try {
            setShowSpinner(true);
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
            setShowSpinner(false);
        } catch (error) {
            setShowSpinner(false);
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
        <div className="p-4 m-4">
            <div className="overflow-x-auto">
                <Table meta={meta} totalCount={totalPage} tableHeads={tableHeads} tableRows={orders || []} />
            </div>
            {showSpinner ? <div style={spinnerContainerStyle} > <SimpleSpinner/> </div>: null}
        </div>
    );
};

export default OrderList;