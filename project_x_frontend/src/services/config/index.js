import { environment } from "@/environments";
import { validateResponse } from "@/network/fetch";

const url = environment.server;

exports.fetchConfig = async () => {
    try {
        return await fetch(
            `${url}/config`,
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