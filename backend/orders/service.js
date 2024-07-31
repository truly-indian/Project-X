const { FetchOrders } = require('./repository');

exports.FetchOrders = async () => {
    try {
        const orders = await FetchOrders();
        return orders;
    } catch (error) {
        console.log('error while fetching orders: ', error);
        throw error;
    }
};