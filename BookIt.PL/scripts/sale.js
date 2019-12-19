define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        services_1.getAllSale();
    });
    $("#selectEdificio").on("change", function () {
        $(".selectDefault").prop('disabled', true);
    });
});
