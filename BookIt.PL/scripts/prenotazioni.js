define(["require", "exports", "./services", "moment"], function (require, exports, services_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewPrenotazioni {
        constructor() {
            this.prenotazioni = [];
            $(document).ready(() => {
                console.log("loaded");
                let inputText = $('input[type="text"]').val();
                this.searchPrenotazioni();
                $("#myInput").keyup(() => {
                    inputText = $('input[type="text"]').val();
                    this.filterPrenotazioni(inputText);
                });
            });
        }
        /**
         * getAllPrenotazioniView
         */
        getAllPrenotazioniView() {
            $("#getAllPrenotazioni").click(function () {
                services_1.getAllPrenotazioni();
            });
        }
        /**
         * searchPrenotazioni
         */
        searchPrenotazioni() {
            services_1.getAllPrenotazioni().then(prenotazioniResponse => {
                let allSaleProm = services_1.getAllSale().then(sale => {
                    prenotazioniResponse.forEach(p => {
                        let salaTmp = sale.find(s => s.ID_Sala === p.ID_Sala);
                        p.NomeSala = salaTmp ? salaTmp.Nome : "Not found";
                        console.log("Nome sala" + p.NomeSala);
                    });
                });
                let allRisorseProm = services_1.getAllRisorse().then(risorse => {
                    prenotazioniResponse.forEach(p => {
                        let risorsaTmp = risorse.find(r => r.ID === p.ID_Risorsa);
                        p.UsernameRisorsa = risorsaTmp ? risorsaTmp.Username : "Not found";
                        p.NomeRisorsa = risorsaTmp ? risorsaTmp.Nome : "Not found";
                        p.CognomeRisorsa = risorsaTmp ? risorsaTmp.Cognome : "Not found";
                        p.EmailRisorsa = risorsaTmp ? risorsaTmp.Email : "Not found";
                    });
                });
                Promise.all([allSaleProm, allRisorseProm]).then(() => {
                    prenotazioniResponse.forEach(prenotazione => {
                        this.prenotazioni.push(prenotazione);
                    });
                    this.populatePrenotazioni(this.prenotazioni);
                });
            });
        }
        ;
        /**
         * filterPrenotazioni
         */
        filterPrenotazioni(inputText) {
            //al keyup filtra e mostra solo un sottinsieme delle prenotazioni
            let prenotazioniFiltrate = [];
            let prenotazioniFiltrateSala = [];
            let prenotazioniFiltrateUsername = [];
            let inputReg = new RegExp(inputText, "i"); //i = ignorecase
            //prenotazioniFiltrate = prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
            prenotazioniFiltrateSala = this.prenotazioni.filter(p => inputReg.test(p.NomeSala));
            prenotazioniFiltrateUsername = this.prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
            prenotazioniFiltrate = prenotazioniFiltrateSala.concat(prenotazioniFiltrateUsername);
            this.populatePrenotazioni(prenotazioniFiltrate);
        }
        ;
        /**
         * populatePrenotazioni
         */
        populatePrenotazioni(prenotazioni) {
            $(".prenotazioniTbody").empty();
            $.each(prenotazioni, (key, prenotazione) => {
                $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + prenotazione.NomeSala + '</td><td class="dataInizio">' + moment(prenotazione.DataInizioPrenotazione).format("DD/MM/YYYY") + '</td><td class="dataFine">' + moment(prenotazione.DataFinePrenotazione).format("DD/MM/YYYY") + '</td><td></td><td></td></tr>');
                $(".prenotazioniTbody").append('<tr><td>' + prenotazione.CognomeRisorsa + '</td><td>' + prenotazione.NomeRisorsa + '</td><td>' + prenotazione.UsernameRisorsa + '</td><td>' + prenotazione.EmailRisorsa + '</td><td>' + prenotazione.Descrizione + '</td></tr>');
            });
            $('.prenotazioniTr').click(function () {
                $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
            }).click();
        }
    }
    exports.ViewPrenotazioni = ViewPrenotazioni;
});
