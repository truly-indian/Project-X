import React, { useEffect, useState } from "react";
import { fetchQuotes } from '@/services/quote/index';
import { fetchOrders } from '@/services/order/index';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import SimpleCard from "@/components/common/Card";
import { GoogleEmbedUrl } from '@/constants/constants';
import { fetchConfig } from '@/services/config';


const getUserId = () => {
    const userToken = Cookies.get('userToken');
    const decodedToken = jwtDecode(userToken);
    return decodedToken._id;
};

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [config, setConfig] = useState({});

    const fetchOrderWrapper = async () => {
        try {
            const user = getUserId();
            const resp = await fetchOrders(0, 0, { 'quotes.userId': user });
            return resp
        } catch (error) {
            console.log('error while fethcing orders: ', error);
        }
    }

    const formatQuotes = (quoteList, orderList) => {
        const result = [];
        quoteList.forEach(quote => {
            const order = orderList.find(o => {
                return o._id == quote.orderId
            });
            if (order) {
                result.push({
                    quoteId: quote._id,
                    userId: quote.userId,
                    shipmentName: order.shipmentName,
                    pickup: order.pickup,
                    drop: order.drop,
                    pickupPoint: order.pickupPoint,
                    dropPoint: order.dropPoint,
                    price: quote.quotePrice
                });
            }
        });
        return result
    }

    const fetchQuotesWrapper = async () => {
        try {
            const user = getUserId();
            const resp = await fetchQuotes(0, 0, { 'userId': user })
            const resp2 = await fetchOrderWrapper(0, 0, { 'quotes.userId': getUserId });
            const fetchedQuotes = resp?.data?.quotes;
            const fetchedOrders = resp2?.data?.orders;
            const formattedQuotesAndOrders = formatQuotes(fetchedQuotes, fetchedOrders);
            setUserOrders(formattedQuotesAndOrders);
            console.log(formattedQuotesAndOrders)
        } catch (error) {
            console.log('error fetching quotes: ', error);
        }
    }

    const fetchConfigWrapper = async () => {
        try {
            const resp = await fetchConfig();
            setConfig(resp?.data);
        } catch (error) {
            console.log('error while fethcing configs: ', error);
        }
    };


    useEffect(() => {
        fetchQuotesWrapper();
        fetchConfigWrapper();
    }, []);



    return (config?.mapsJavascriptAPIKey) ? (
        <div>
            <div className="flex gap-5">
                {userOrders.map(order => {
                    const src = `${GoogleEmbedUrl}${order?.pickupPoint?.lat},${order?.pickupPoint?.lng}&destination=${order?.dropPoint?.lat},${order?.dropPoint?.lng}&key=${config?.mapsJavascriptAPIKey}`;
                    return <SimpleCard price={order.price} imgSrc={src} key={order?.quoteId} cardHeading={order?.shipmentName || ''} cardText={order?.shipmentName || ''}></SimpleCard>
                })}
            </div>
        </div>
    ): null;
}

export default QuoteList;