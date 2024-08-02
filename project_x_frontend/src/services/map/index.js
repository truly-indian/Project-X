import { environment } from "@/environments";
import { validateResponse } from "@/network/fetch";

const url = environment.server;

exports.fetchOrders = async (pickup, drop) => {
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