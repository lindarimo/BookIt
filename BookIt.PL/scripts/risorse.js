define(["require", "exports", "./services", "./index"], function (require, exports, services_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewRisorse {
        constructor() {
            $(document).ready(() => {
                console.log("loaded");
                this.searchRisorse();
            });
            $("#creaRisorsa").click(function (event) {
                var _a, _b;
                event.preventDefault();
                let cognome = (_a = $("#cognome").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
                let nome = (_b = $("#nome").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
                if (cognome && nome) {
                    if (cognome.length > 4 && nome.length > 1) {
                        index_1.ViewIndex.regex.test(cognome) && index_1.ViewIndex.regex.test(nome) ? services_1.creaRisorsa() : alert("Non puoi inserire caratteri speciali.");
                    }
                    else {
                        alert("Il cognome deve essere di almeno 5 caratteri e il nome di 2 caratteri.");
                    }
                }
                else {
                    alert("Compila tutti i campi!");
                    event.stopPropagation();
                }
            });
        }
        ;
        /**
         * searchRisorse
         */
        searchRisorse() {
            services_1.getAllRisorse().then(risorseResponse => {
                $.each(risorseResponse, (key, item) => {
                    $(".risorseTbody").append('<tr class= "risorseTr"><td class="cognome">' + item.Cognome + '</td><td class="nome">' + item.Nome + '</td></tr>');
                    if (item.FlagPrenotazione == false) {
                        $(".risorseTbody").append('<tr class = "dettagliTable"><td colspan="2"><b>Username: </b>' + item.Username + '<br><b>Email: </b>' + item.Email + '<br><div class="text-center redText textDiv">Utente non abilitato alla prenotazione</div><div class="text-center textDiv"><button class="flagPrenotazioneButton btn btn-danger createButton" id="' + item.ID + '">Abilita</button></div></td></tr>');
                    }
                    else {
                        $(".risorseTbody").append('<tr class = "dettagliTable"><td colspan="2"><b>Username: </b>' + item.Username + '<br><b>Email: </b>' + item.Email + '<br><div class="text-center textDiv">Utente abilitato alla prenotazione</div></td></tr>');
                    }
                });
                $('.risorseTr').click(function () {
                    $(this).nextUntil('.risorseTr').toggleClass('hide');
                }).click();
                $(".flagPrenotazioneButton").click(function () {
                    services_1.aggiornaRisorsa(parseInt(this.id));
                });
            });
        }
    }
    exports.ViewRisorse = ViewRisorse;
});
