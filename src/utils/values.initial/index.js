import moment from "moment";

const date = moment().toDate();

// TODO update on release
export const newOrderForm = {
    customerName: "Eunice Anikka",
    contactNumber: "09283735902",
    email: "eunice.anikka@gmail.com",
    facebook: "eunice.anikka",
    instagram: "eunice.anikka",
    deliveryAddress: "123 North Caloocan",
    request: "Test request",
    specialOffer: "Test special offer",
    date: date,
    pickupDate: date,
    orders: [
        {
            "value": "Apple_Crumble",
            "name": "Apple Crumble",
            "price": 800,
            "quantity": 2
        }, {
            "value": "Splenda_Apple_Crumble",
            "name": "Splenda Apple Crumble",
            "price": 1100,
            "quantity": 2
        }
    ],
    deliveryMethod: ["Lalamove"],
    pickupLocation: ["Magallanes"],
    paymentOption: ["bdo"],
    paymentStatus: 1,
    discountType: 1,
    discountAmount: "30"
};
