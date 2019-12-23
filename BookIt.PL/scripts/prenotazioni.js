define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        var inputText = $('input[type="text"]').val();
        SearchPrenotazioni(inputText);
        $("#myInput").keyup(function () {
            inputText = $('input[type="text"]').val();
            SearchPrenotazioni(inputText);
        });
    });
    $("#getAllPrenotazioni").click(function () {
        services_1.getAllPrenotazioni();
    });
    function SearchPrenotazioni(inputText) {
        services_1.getAllPrenotazioni().then(function (prenotazioni) {
            console.log(prenotazioni);
            var prenotazioniFiltrate = [];
            if (inputText.length !== 0) {
                prenotazioni.forEach(function (prenotazione) {
                    if (prenotazione.Descrizione.indexOf(inputText) > -1) {
                        prenotazioniFiltrate.push(prenotazione);
                    }
                });
                populatePrenotazioni(prenotazioniFiltrate);
                console.log("filtrate" + prenotazioniFiltrate);
            }
            else {
                prenotazioni.forEach(function (prenotazione) {
                    prenotazioniFiltrate.push(prenotazione);
                });
                populatePrenotazioni(prenotazioniFiltrate);
            }
            return prenotazioniFiltrate;
        });
    }
    exports.SearchPrenotazioni = SearchPrenotazioni;
    function populatePrenotazioni(prenotazioni) {
        $(".prenotazioniTbody").empty();
        $.each(prenotazioni, function (key, prenotazione) {
            services_1.getSala(prenotazione.ID_Sala).then(function (sala) {
                services_1.getRisorsa(prenotazione.ID_Risorsa).then(function (risorsa) {
                    $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + sala.Nome + '</td><td class="dataInizio">' + prenotazione.DataInizioPrenotazione + '</td><td class="dataFine">' + prenotazione.DataFinePrenotazione + '</td><td></td><td></td></tr>');
                    $(".prenotazioniTbody").append('<tr><td>' + risorsa.Cognome + '</td><td>' + risorsa.Nome + '</td><td>' + risorsa.Username + '</td><td>' + risorsa.Email + '</td><td>' + prenotazione.Descrizione + '</td></tr>');
                });
            });
        });
        $('.prenotazioniTr').click(function () {
            $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
        }).click();
    }
    exports.populatePrenotazioni = populatePrenotazioni;
});
