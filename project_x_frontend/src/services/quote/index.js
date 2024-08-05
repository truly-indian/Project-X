import { environment } from "@/environments";
import { validateResponse } from "@/network/fetch";
import Cookies from "js-cookie";

const url = environment.server;

const getUserToken = () => {
    const userToken = Cookies.get('userToken');
    return userToken;
};

exports.fetchQuotes = async (from, limit = -1, query) => {
    try {
        return await fetch(
            `${url}/api/v1/quotes?from=${from}&limit=${limit}`,
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