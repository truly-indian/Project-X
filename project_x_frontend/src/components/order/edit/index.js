import React, { useEffect, useState, useRef } from "react";
import { fetchOrderById, updateOrderQuote } from '@/services/order';
import { fetchConfig } from '@/services/config';
import Table from "@/components/common/Table";
import SimpleButton from "@/components/common/Button";
import BasicDialog from '@/components/common/Dialog';
import { GoogleEmbedUrl } from '@/constants/constants';
import SimpleSpinner from "@/components/common/Spinner";
import { useRouter } from "next/navigation";

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    marginTop: '7rem'
};

const spinnerContainerStyle = {
    position: 'fixed', // Make the spinner container cover the entire viewport
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Ensure it appears above other content
    backgroundColor: 'rgba(255, 255, 255, 0.5)' // O
};

const mapStyle = {
    height: '100%',
    width: '100%',
    border: '0'
};

const OrderEdit = ({ orderId }) => {
    const [order, setOrder] = useState({});
    const [formattedOrder, setFormattedOrder] = useState([]);
    const [config, setConfig] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [dialogInfo, setDialogInfo] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const orderRef = useRef();
    const router = useRouter();

    const src = `${GoogleEmbedUrl}${order?.pickupPoint?.lat},${order?.pickupPoint?.lng}&destination=${order?.dropPoint?.lat},${order?.dropPoint?.lng}&key=${config?.mapsJavascriptAPIKey}`;

    const tableHeads = ['Shipment Name', 'Pickup', 'Drop', 'Distance In Kms', 'Quoted Price', 'Quote Price'];

    const RouteToPage = (path, timeout=2000) => {
        setTimeout(() => {
            router.push(path);
            setShowSpinner(false);
        }, timeout);
    }

    const onQuotePriceSubmit = async (callbackParams) => {
        try {
            setShowSpinner(true);
            const quotePrice = callbackParams?.quotePrice || 0;
            const result = await updateOrderQuote(orderId, { quotePrice });
            const updatedOrder = result?.data;
            setOrder(updatedOrder);
            formatOrder(updatedOrder);
            orderRef.current = updatedOrder.data;
            RouteToPage('/quote/list');
        } catch (error) {
            setShowSpinner(false);
            console.log('error while updating order with quote price: ', error);
        }
    };

    const quotePriceHandler = () => {
        const dialog = {
            type: 'quote_price_form',
            triggerCloseDialog: setShowDialog,
            meta: {
                quotedPrice: orderRef?.current?.quotedPrice,
                triggerOnSubmit: onQuotePriceSubmit
            }
        }
        setDialogInfo(dialog);
        setShowDialog(true);
    }

    const formatOrder = (fetchedOrder) => {
        const or = [{
            "Shipment Name": fetchedOrder.shipmentName,
            "Pickup": fetchedOrder.pickup,
            "Drop": fetchedOrder.drop,
            "Distance in Kms": fetchedOrder.distanceInKms,
            "Quoted Price": fetchedOrder.quotedPrice,
            "Options": [
                <SimpleButton key="view" onClick={() => quotePriceHandler()} size={'sm'} buttonText={'Quote'} />
            ]
        }];
        setFormattedOrder(or);
    };

    const fetchOrderWrapper = async (_id) => {
        try {
            if (!_id) return;
            const resp = await fetchOrderById(_id);
            setOrder(resp?.data);
            formatOrder(resp?.data);
            orderRef.current = resp?.data;
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

    return (config?.mapsJavascriptAPIKey) ? (
        <div>
            <div className="flex justify-center">
                <Table meta={meta} tableHeads={tableHeads} tableRows={formattedOrder || []}></Table>
            </div>
            {showSpinner ? <div style={spinnerContainerStyle}><SimpleSpinner></SimpleSpinner> </div> : null}
            <div style={containerStyle}>
                <iframe
                    style={mapStyle}
                    loading="lazy"
                    allowFullScreen
                    src={src}
                    title="Google Maps Directions"
                ></iframe>
            </div>
            {showDialog ? <BasicDialog dialogInfo={dialogInfo}></BasicDialog> : null}
        </div>

    ) : null;
}

export default OrderEdit;
