import React, { useEffect, useState } from "react";
import { fetchOrderById } from '@/services/order';
import { fetchConfig } from '@/services/config';
import Table from "@/components/common/Table";
import SimpleButton from "@/components/common/Button";

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    marginTop: '10rem'
};

const mapStyle = {
    height: '100%',
    width: '100%',
    border: '0'
};

const OrderView = ({ orderId }) => {
    const [order, setOrder] = useState({});
    const [formattedOrder, setFormattedOrder] = useState([]);
    const [config, setConfig] = useState({});

    const tableHeads = ['Shipment Name', 'Pickup', 'Drop', 'Distance In Kms', 'Quoted Price' , 'Quote Price'];

    const formatOrder = (fetchedOrder) => { 
        const or = [{
                "Shipment Name": fetchedOrder.shipmentName,
                "Pickup": fetchedOrder.pickup,
                "Drop": fetchedOrder.drop,
                "Distance in Kms": fetchedOrder.distanceInKms,
                "Quoted Price": fetchedOrder.quotedPrice,
                "Options": [
                    <SimpleButton key="view" size={'sm'} buttonText={'Quote'} />
                ]
        }];
        setFormattedOrder(or);
    };

    const fetchOrderWrapper = async (_id) => {
        try {
            if (!_id) return;
            const resp = await fetchOrderById(_id);
            setOrder(resp?.data);
            formatOrder(resp?.data);;
        } catch (error) {
            console.log('error while fethcing order.: ', error);
        }
    };

    const fetchConfigWrapper = async () => {
        try {
            const resp = await fetchConfig();
            setConfig(resp?.data);
        } catch (error) {
            console.log('error while fethcing configs: ', error);
        }
    };

    useEffect(() => {
        fetchOrderWrapper(orderId);
        fetchConfigWrapper();
    }, [orderId]);

    const meta = {
        showPagination: false
    }

    const src = `https://www.google.com/maps/embed/v1/directions?origin=${order?.pickupPoint?.lat},${order?.pickupPoint?.lng}&destination=${order?.dropPoint?.lat},${order?.dropPoint?.lng}&key=${config?.mapsJavascriptAPIKey}`;

    return (config?.mapsJavascriptAPIKey) ? (
        <div>
            <div className="flex">
                    <Table meta={meta} tableHeads={tableHeads} tableRows={formattedOrder || []}></Table>
            </div>
            <div style={containerStyle}>
                <iframe
                    style={mapStyle}
                    loading="lazy"
                    allowFullScreen
                    src={src}
                    title="Google Maps Directions"
                ></iframe>
            </div>
        </div>

    ) : null;
}

export default OrderView;
