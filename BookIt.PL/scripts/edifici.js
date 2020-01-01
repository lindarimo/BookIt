define(["require", "exports", "./index", "./services"], function (require, exports, index_1, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewEdifici {
        constructor() {
            this.edifici = [];
            $(document).ready(() => {
                this.searchEdifici();
            });
            // Gestisco il click del bottone per creare una nuova risorsa
            $("#creaEdificio").click(function (event) {
                var _a, _b, _c;
                event.preventDefault();
                let nomeEdificio = (_a = $("#nomeEdificio").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
                let indirizzioEdificio = (_b = $("#indirizzoEdificio").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
                let disponibilitaEdificio = (_c = $("#disponibilitaEdificio").val()) === null || _c === void 0 ? void 0 : _c.toString().trim();
                let edificio = {
                    Nome: nomeEdificio,
                    Indirizzo: indirizzioEdificio,
                    Stato: disponibilitaEdificio,
                };
                if (nomeEdificio && indirizzioEdificio && disponibilitaEdificio) {
                    // Controllo se sono stati inseriti caratteri speciali
                    index_1.ViewIndex.regex.test(nomeEdificio) && index_1.ViewIndex.regex.test(indirizzioEdificio) ? services_1.Services.createBuilding(edificio) : alert("Non puoi inserire caratteri speciali.");
                }
                else {
                    alert("Compila tutti i campi!");
                    event.stopPropagation();
                }
            });
        }
        /**
         * Metodo che prende tutte le sale per ogni edificio
         */
        searchEdifici() {
            let saleArray;
            let allSaleProm;
            services_1.Services.getAllBuildings().then(edificiResponse => {
                $.each(edificiResponse, (key, edificio) => {
                    allSaleProm = services_1.Services.getAllRoomsByBuilding(edificio.ID_Edificio).then(e => {
                        saleArray = e.filter(r => r.ID_Edificio === edificio.ID_Edificio);
                        edificio.Sale = saleArray;
                    });
                });
                Promise.all([allSaleProm]).then(() => {
                    edificiResponse.forEach(edificio => {
                        this.edifici.push(edificio);
                    });
                    // Stampo a video la lista di edifici
                    this.populateEdifici(this.edifici);
                });
            });
        }
        ;
        /**
         * Metodo che stampa a video la lista di edifici con le rispettive sale
         */
        populateEdifici(edifici) {
            $.each(edifici, (key, edificio) => {
                $(".edificiTbody").append('<tr class= "edificiTr"><td class="nomeEdificio">' + edificio.Nome + '</td><td class="indirizzo">' + edificio.Indirizzo + '</td><td class="stato">' + edificio.Stato + '</td></tr>');
                if (edificio.Sale.length > 0) {
                    $(".edificiTbody").append('<tr><td colspan="3"><b>Sale: </b>');
                    edificio.Sale.forEach(element => {
                        $(".edificiTbody").append('<li class="nomeSala">' + element.Nome + '</li><br>');
                    });
                }
                else {
                    $(".edificiTbody").append('<tr><td colspan="3"><span>Questo edificio non ha ancora sale censite.</span></td></tr>');
                }
            });
            $('.edificiTr').click(function () {
                $(this).nextUntil('.edificiTr').toggleClass('hide');
            }).click();
        }
        ;
    }
    exports.ViewEdifici = ViewEdifici;
});
