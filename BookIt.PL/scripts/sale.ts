import { getAllSale } from "./services";

$(document).ready(() => {
    console.log("loaded");
    getAllSale();
})
$("#selectEdificio").on("change", function () {
    $(".selectDefault").prop('disabled', true);
});