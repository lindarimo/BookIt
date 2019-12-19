define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        services_1.getAllRisorse();
    });
    $("#getAllRisorse").click(function () {
        services_1.getAllRisorse();
    });
    $("#creaRisorsa").click(function () {
        services_1.creaRisorsa();
    });
    function populateRisorse(risorse) {
        $.each(risorse, function (key, item) {
            $(".risorseTbody").append('<tr class= "risorseTr"><td class="cognome">' + item.Cognome + '</td><td class="nome">' + item.Nome + '</td><td></td><td></td></tr>');
            if (item.FlagPrenotazione == false) {
                $(".risorseTbody").append('<tr><td>' + item.Username + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td><td><button class="flagPrenotazioneButton" id="' + item.ID + '">Abilita utente alla prenotazione</button></td></tr>');
            }
            else {
                $(".risorseTbody").append('<tr><td>' + item.Username + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td><td></td></tr>');
            }
        });
        $('.risorseTr').click(function () {
            $(this).nextUntil('.risorseTr').toggleClass('hide');
        }).click();
        $(".flagPrenotazioneButton").click(function () {
            services_1.aggiornaRisorsa(parseInt(this.id));
        });
    }
    exports.populateRisorse = populateRisorse;
});
