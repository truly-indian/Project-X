import { environment } from "@/environments";
import { validateResponse } from "@/network/fetch";
import Cookies from "js-cookie";

const url = environment.server;

const getUserToken = () => {
    const userToken = Cookies.get('userToken');
    return userToken;
};

exports.fetchOrders = async (from, limit=-1, query ={}) => {
    try {
        return await fetch(
            `${url}/api/v1/orders?from=${from}&limit=${limit}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }
        ).then(validateResponse)
            .then(resp => resp)
            .catch(err => { throw err });
    } catch (error) {
        throw error;
    }
}

exports.fetchOrderById = async (_id) => {
    try {
        return await fetch(
            `${url}/api/v1/orders/${_id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(validateResponse)
            .then(resp => resp)
            .catch(err => { throw err });
    } catch (error) {
        throw error;
    }
}

exports.updateOrder = async (_id, request) => {
    try {
        return await fetch(
            `${url}/api/v1/orders/${_id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': getUserToken()
                },
                body: JSON.stringify(request)
            }
        ).then(validateResponse)
            .then(resp => resp)
            .catch(err => { throw err });
    } catch (error) {
        throw error;
    }
}