
const url = 'http://backend.starevents.online:8080'
import { validateResponse } from "@/network/fetch";

exports.signIn = async ({ email, password }) => {
    try {
        return await fetch(
            `${url}/api/v1/auth/sign_in`,
            {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ email, password })
            }
        ).then(validateResponse)
            .then(resp => resp)
            .catch(err => { throw err });
    } catch (error) {
        throw error;
    }
}

exports.signUp = async ({ email, password }) => {
    try {
        const requestBody = { email, password };
        return await fetch(
            `${url}/api/v1/auth/sign_up`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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