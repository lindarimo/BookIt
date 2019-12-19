define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        services_1.getAllEdifici();
        var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
        console.log(edificioName);
    });
    $("#creaEdificio").click(function () {
        services_1.creaEdificio();
    });
    function populateEdifici(edifici) {
        $.each(edifici, function (key, item) {
            $(".edificiTbody").append('<tr class= "edificiTr"><td class="nome">' + item.Nome + '</td><td class="indirizzo">' + item.Indirizzo + '</td><td class="stato">' + item.Stato + '</td></tr>');
        });
    }
    exports.populateEdifici = populateEdifici;
});
