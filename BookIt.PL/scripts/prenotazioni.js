define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var prenotazioni = [];
    $(document).ready(function () {
        console.log("loaded");
        var inputText = $('input[type="text"]').val();
        SearchPrenotazioni();
        $("#myInput").keyup(function () {
            inputText = $('input[type="text"]').val();
            filterPrenotazioni(inputText);
        });
    });
    $("#getAllPrenotazioni").click(function () {
        services_1.getAllPrenotazioni();
    });
    function SearchPrenotazioni() {
        services_1.getAllPrenotazioni().then(function (response) {
            services_1.getAllSale().then(function (sale) {
                response.forEach(function (p) {
                    var salaTmp = sale.find(function (s) { return s.ID_Sala === p.ID_Sala; });
                    p.NomeSala = salaTmp ? salaTmp.Nome : "Not found";
                    console.log("Nome sala" + p.NomeSala);
                });
            });
            services_1.getAllRisorse().then(function (risorse) {
                response.forEach(function (p) {
                    var risorsaTmp = risorse.find(function (r) { return r.ID === p.ID_Risorsa; });
                    p.UsernameRisorsa = risorsaTmp ? risorsaTmp.Username : "Not found";
                    console.log("username risorsa" + p.UsernameRisorsa);
                });
            });
            response.forEach(function (prenotazione) {
                prenotazioni.push(prenotazione);
            });
            console.log("NON filtrate" + prenotazioni);
            populatePrenotazioni(prenotazioni);
        });
    }
    exports.SearchPrenotazioni = SearchPrenotazioni;
    function filterPrenotazioni(inputText) {
        //al keyup filtra e mostra solo un sottinsieme delle prenotazioni
        var prenotazioniFiltrate = [];
        var prenotazioniFiltrateSala = [];
        var prenotazioniFiltrateUsername = [];
        var inputReg = new RegExp(inputText, "i"); //i = ignorecase
        //prenotazioniFiltrate = prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
        prenotazioniFiltrateSala = prenotazioni.filter(function (p) { return inputReg.test(p.NomeSala); });
        prenotazioniFiltrateUsername = prenotazioni.filter(function (p) { return inputReg.test(p.UsernameRisorsa); });
        prenotazioniFiltrate = prenotazioniFiltrateSala.concat(prenotazioniFiltrateUsername.filter(function (item) { return prenotazioniFiltrateSala.indexOf(item) < 0; }));
        //prenotazioniFiltrate = prenotazioniFiltrateSala.concat(prenotazioniFiltrateUsername);
        populatePrenotazioni(prenotazioniFiltrate);
    }
    exports.filterPrenotazioni = filterPrenotazioni;
    ;
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
