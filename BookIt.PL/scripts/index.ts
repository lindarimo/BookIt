import { getAllUsernames, getAllEdificiNames, getAllSaleNames } from "./services";

$(window).on('load', function () {
    console.log("loaded");
    getAllUsernames();
    getAllEdificiNames();
    getAllSaleNames();
})