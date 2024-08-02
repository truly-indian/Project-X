import { environment } from "@/environments";
import { validateResponse } from "@/network/fetch";

const url = environment.server;

exports.fetchOrders = async (from, limit=-1) => {
    try {
        return await fetch(
            `${url}/api/v1/orders?from=${from}&limit=${limit}`,
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