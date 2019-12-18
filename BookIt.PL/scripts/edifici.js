define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        services_1.getAllEdifici();
        var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
        console.log(edificioName);
    });
    function populateEdifici(edifici) {
        $.each(edifici, function (key, item) {
            $(".edificiTbody").append('<tr class= "edificiTr"><td class="nome">' + item.Nome + '</td><td class="indirizzo">' + item.Indirizzo + '</td></tr>');
            //$(".edificiTbody").append('<tr><td>' + item.Stato + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td></tr>');
        });
        $('.risorseTr').click(function () {
            $(this).nextUntil('.risorseTr').toggleClass('hide');
        }).click();
    }
    exports.populateEdifici = populateEdifici;
});
