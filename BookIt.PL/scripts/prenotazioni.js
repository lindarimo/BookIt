define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        var prenotazioni = services_1.getAllPrenotazioni();
    });
    $("#getAllPrenotazioni").click(function () {
        services_1.getAllPrenotazioni();
    });
    function populatePrenotazioni(prenotazioni) {
        $.each(prenotazioni, function (key, prenotazione) {
            services_1.getSala(prenotazione.ID_Sala).then(function (sala) {
                $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + sala.Nome + '</td><td class="dataInizio">' + prenotazione.DataInizioPrenotazione + '</td><td class="dataFine">' + prenotazione.DataFinePrenotazione + '</td><td></td></tr>');
                console.log(sala);
            });
            services_1.getRisorsa(prenotazione.ID_Risorsa).then(function (risorsa) {
                // $(".prenotazioniTbody").append('<tr><td>' + item.Username + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td><td><button class="flagPrenotazioneButton" id="' + item.ID + '">Abilita utente alla prenotazione</button></td></tr>');
                console.log(risorsa);
            });
            $('.prenotazioniTr').click(function () {
                $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
            }).click();
        });
    }
    exports.populatePrenotazioni = populatePrenotazioni;
});
