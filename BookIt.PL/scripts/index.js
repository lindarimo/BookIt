"use strict";
exports.__esModule = true;
var services_1 = require("./services");
$(function () {
    console.log("loaded");
    services_1.getAllUsernames();
    services_1.getAllEdificiNames();
    services_1.getAllSaleNames();
});
