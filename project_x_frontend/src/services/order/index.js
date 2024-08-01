const url = 'http://backend.starevents.online:8080'
import { validateResponse } from "@/network/fetch";

exports.fetchOrders = async () => {
    try {
        return await fetch(
            `${url}/api/v1/orders/`,
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