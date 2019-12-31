define(["require", "exports", "./services", "moment", "./index"], function (require, exports, services_1, moment, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewPrenotazioni {
        constructor() {
            this.prenotazioni = [];
            $(document).ready(() => {
                console.log("loaded");
                let inputText = $('input[type="text"]').val();
                this.searchPrenotazioni();
                this.populateUsernames();
                this.prenotazioneModal();
                $("#myInput").keyup(() => {
                    inputText = $('input[type="text"]').val();
                    this.filterPrenotazioni(inputText);
                });
            });
            $("#creaPrenotazione").click(function (event) {
                var _a;
                event.preventDefault();
                let descrizione = (_a = $("#descrizione").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
                let selectUsername = $("#selectUsername").val();
                let selectEdificio = $("#selectEdificio").val();
                let selectSala = $("#selectSala").val();
                if (descrizione && selectUsername && selectEdificio && selectSala) {
                    index_1.ViewIndex.regex.test(descrizione) ? services_1.doPrenotazione() : alert("Non puoi inserire caratteri speciali.");
                }
                else {
                    alert("Compila tutti i campi!");
                    event.stopPropagation();
                }
            });
        }
        ;
        /**
         * prenotazioneModal
         */
        prenotazioneModal() {
            $("#selectUsername").on("change", function () {
                $(".selectDefault").prop('disabled', true);
            });
            $("#selectEdificio").on("change", function () {
                var _a;
                $('.salaItem').remove();
                $("#selectSala").removeAttr('disabled');
                $(".selectDefault").prop('disabled', true);
                let a = ((_a = $("#selectEdificio").val()) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                services_1.getAllSaleByEdificio(parseInt(a)).then(saleResponse => {
                    $.each(saleResponse, (key, item) => {
                        if (item.Stato === "Prenotabile") {
                            $('#selectSala').append(`<option class = "salaItem" name = "${item.Nome}" value = "${item.ID_Sala}"> ${item.Nome}</option>`);
                        }
                    });
                });
            });
            $("#bookDateStart").on("change", function () {
                let initDate = $("#bookDateStart").val();
                console.log(initDate);
                $("#bookDateEnd").removeAttr('disabled');
                $("#bookDateEnd").attr("min", initDate);
            });
            $("#bookDateEnd").focusout(function () {
                let initDate = $("#bookDateStart").val();
                let endDate = $("#bookDateEnd").val();
                if (initDate && endDate && initDate >= endDate) {
                    alert("Attenzione! La data e l'ora di inizio devono essere antecedenti alla data e ora di fine prenotazione!");
                    $("#bookDateEnd").val("");
                }
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
            prenotazioniFiltrateSala = this.prenotazioni.filter(p => inputReg.test(p.NomeSala));
            prenotazioniFiltrateUsername = this.prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
            this.populatePrenotazioni([...new Set([...prenotazioniFiltrateSala, ...prenotazioniFiltrateUsername])]);
        }
        ;
        /**
         * populatePrenotazioni
         */
        populatePrenotazioni(prenotazioni) {
            $(".prenotazioniTbody").empty();
            $.each(prenotazioni, (key, prenotazione) => {
                $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + prenotazione.NomeSala + '</td><td class="dataInizio">' + moment(prenotazione.DataInizioPrenotazione).format("DD/MM/YYYY") + ' dalle: ' + moment(prenotazione.DataInizioPrenotazione).format("HH:mm") + ' </td><td class="dataFine">' + moment(prenotazione.DataFinePrenotazione).format("DD/MM/YYYY") + ' dalle: ' + moment(prenotazione.DataFinePrenotazione).format("HH:mm") + '</td></tr>');
                $(".prenotazioniTbody").append('<tr class = "dettagliTable"><td><span class = "redText">Dettagli della prenotazione: </span><br><b>Cognome: </b>' + prenotazione.CognomeRisorsa + '<br><b>Nome: </b>' + prenotazione.NomeRisorsa + '<br><b>Username: </b>' + prenotazione.UsernameRisorsa + '</td><td colspan="2"><br><b>Email: </b>' + prenotazione.EmailRisorsa + '<br><b>Descrizione: </b>' + prenotazione.Descrizione + '<br><hr><button type="button" class="btn btn-danger eliminaPrenotazione" id="' + prenotazione.ID_Prenotazione + '">Elimina</button></td></tr>');
            });
            $('.prenotazioniTr').click(function () {
                $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
            }).click();
            $(".eliminaPrenotazione").click(function () {
                if (confirm('Stai per eliminare una prenotazione. Vuoi procedere?')) {
                    services_1.deletePrenotazione(parseInt(this.id));
                }
            });
        }
        ;
        populateUsernames() {
            services_1.getAllUsersCanBook().then(usersResponse => {
                $.each(usersResponse, (key, item) => {
                    $('#selectUsername').append(`<option name = "${item.Username}" value = "${item.ID}"> ${item.Username}</option>`);
                });
            });
        }
        ;
    }
    exports.ViewPrenotazioni = ViewPrenotazioni;
});
