define(["require", "exports", "./services", "./index"], function (require, exports, services_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewEdifici {
        constructor() {
            this.edifici = [];
            $(document).ready(() => {
                this.searchEdifici();
            });
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
                    index_1.ViewIndex.regex.test(nomeEdificio) && index_1.ViewIndex.regex.test(indirizzioEdificio) ? services_1.creaEdificio(edificio) : alert("Non puoi inserire caratteri speciali.");
                }
                else {
                    alert("Compila tutti i campi!");
                    event.stopPropagation();
                }
            });
        }
        /**
         * searchEdifici
         */
        searchEdifici() {
            let saleArray;
            let allSaleProm;
            services_1.getAllEdifici().then(edificiResponse => {
                $.each(edificiResponse, (key, edificio) => {
                    allSaleProm = services_1.getAllSaleByEdificio(edificio.ID_Edificio).then(e => {
                        saleArray = e.filter(r => r.ID_Edificio === edificio.ID_Edificio);
                        edificio.Sale = saleArray;
                    });
                });
                Promise.all([allSaleProm]).then(() => {
                    edificiResponse.forEach(edificio => {
                        this.edifici.push(edificio);
                    });
                    this.populateEdifici(this.edifici);
                });
            });
        }
        ;
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
