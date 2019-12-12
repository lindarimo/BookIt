import { getAllUsernames, getAllEdificiNames, getAllSaleNames } from "./services";

$(document).ready(() => {
    console.log("loaded");
    getAllUsernames();
    getAllEdificiNames();
    getAllSaleNames();
})