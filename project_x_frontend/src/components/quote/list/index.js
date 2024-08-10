import React, { useEffect, useState } from "react";
import { fetchQuotes } from '@/services/quote/index';
import { fetchOrders } from '@/services/order/index';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import SimpleCard from "@/components/common/Card";
import { GoogleEmbedUrl } from '@/constants/constants';
import { fetchConfig } from '@/services/config';
import { useRouter } from "next/navigation";


const getUserId = () => {
    const userToken = Cookies.get('userToken');
    const decodedToken = jwtDecode(userToken);
    return decodedToken._id;
};

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [config, setConfig] = useState({});
    const router = useRouter();

    const fetchOrderWrapper = async () => {
        try {
            const user = getUserId();
            const resp = await fetchOrders(0, 0, { 'quotes.userId': user });
            return resp
        } catch (error) {
            console.log('error while fethcing orders: ', error);
        }
    }

    const goToOrderDetailsPage = (orderId='') => {
        console.log('redirecting to orderId: ', orderId)
        router.push(`/order/edit?order_id=${orderId}`);
    };

    const getButtons = (quoteId, userId, orderId) => {
        return [
            {
                label: 'View order Details',
                color: 'blue',
                onClick: () => goToOrderDetailsPage(orderId)
            }, 
            {
                label: 'Bid Out',
                color: 'red',
            }
    ]
    };

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
                    price: quote.quotePrice,
                    buttons: getButtons(quote._id, quote.userId, quote.orderId)
                });
            }
        });
        return result
    }

    const fetchQuotesWrapper = async () => {
        try {
            const user = getUserId();
            const resp = await fetchQuotes(0, 0, { 'userId': user })
            const resp2 = await fetchOrderWrapper(0, 0, { 'quotes.userId': user });
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
            <div className="flex flex-wrap gap-5">
                {userOrders.map(order => {
                    const src = `${GoogleEmbedUrl}${order?.pickupPoint?.lat},${order?.pickupPoint?.lng}&destination=${order?.dropPoint?.lat},${order?.dropPoint?.lng}&key=${config?.mapsJavascriptAPIKey}`;
                    return <SimpleCard buttons={order.buttons} price={order.price} imgSrc={src} key={order?.quoteId} cardHeading={order?.shipmentName || ''} cardText={order?.shipmentName || ''}></SimpleCard>
                })}
            </div>
        </div>
    ): null;
}

export default QuoteList;