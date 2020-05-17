import moment from "moment";

const date = moment().toDate();

export const newOrderForm = {
    customerName: "Eunice Anikka",
    contactNumber: "09283735902",
    email: "eunice.anikka@gmail.com",
    facebook: "eunice.anikka",
    instagram: "eunice.anikka",
    deliveryAddress: "123 North Caloocan",
    request: "Test request",
    specialOffer: "Test special offer",
    dateOrdered: date,
    pickupDate: date,
    orders: [
        {
            "productId": 1,
            "name": "Apple Crumble",
            "price": 800,
            "quantity": 2
        }, {
            "productId": 2,
            "name": "Splenda Apple Crumble",
            "price": 1100,
            "quantity": 3
        }
    ],
    deliveryMethod: ["Lalamove"],
    pickupLocation: ["Magallanes"],
    paymentOption: ["bdo"],
    paymentStatus: 1,
    discountType: 1,
    discountAmount: "30"
};
