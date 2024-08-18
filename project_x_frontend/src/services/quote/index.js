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

exports.updateQuote = async (_id, requestBody) => {
    try {
        return await fetch(
            `${url}/api/v1/quotes/${_id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': getUserToken()
                },
                body: JSON.stringify(requestBody)
            }
        ).then(validateResponse)
            .then(resp => resp)
            .catch(err => { throw err });
    } catch (error) {
        throw error;
    }
}

exports.postQuote = async (requestBody) => {
    try {
        return await fetch(
            `${url}/api/v1/quotes/submit_quote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': getUserToken()
                },
                body: JSON.stringify(requestBody)
            }
        ).then(validateResponse)
            .then(resp => resp)
            .catch(err => { throw err });
    } catch (error) {
        throw error;
    }
}