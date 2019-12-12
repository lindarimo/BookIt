import { getAllUsernames, getAllEdificiNames, getAllSaleNames } from "./services";

$(function () {
    console.log("loaded");
    getAllUsernames();
    getAllEdificiNames();
    getAllSaleNames();
})