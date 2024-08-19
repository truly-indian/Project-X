
import { environment } from "@/environments";
import { validateResponse } from "@/network/fetch";
const url = environment.server;
import Cookies from "js-cookie";

const getUserToken = () => {
    const userToken = Cookies.get('userToken');
    return userToken;
};

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

exports.updateUser = async (userProfile) => {
    try {
        return await fetch(
            `${url}/api/v1/auth/user/update`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': getUserToken()
                },
                body: JSON.stringify(userProfile)
            }
        ).then(validateResponse)
            .then(resp => resp)
            .catch(err => { throw err });
    } catch (error) {
        throw error;
    }
}