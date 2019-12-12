define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        services_1.getAllUsernames();
        services_1.getAllEdificiNames();
        services_1.getAllSaleNames();
    });
});
