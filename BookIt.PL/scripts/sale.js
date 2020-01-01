define(["require", "exports", "./index", "./services"], function (require, exports, index_1, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewSale {
        constructor() {
            this.sale = [];
            $(document).ready(() => {
                console.log("loaded");
                this.searchSale();
                this.populateEdificiNames();
            });
            $("#selectEdificio").on("change", function () {
                $('.salaItem').remove();
                $("#selectSala").removeAttr('disabled');
                // disabilito il default della dropdown
                $(".selectDefault").prop('disabled', true);
            });
            $("#selectEdificio").on("change", function () {
                $(".selectDefault").prop('disabled', true);
            });
            $("#creaSala").click(function (event) {
                var _a, _b, _c;
                event.preventDefault();
                let edificio = (_a = $("#selectEdificio").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
                let nomeSala = (_b = $("#nomeSala").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
                let postiSala = $("#postiSala").val();
                let sala = {
                    ID_Edificio: $("#selectEdificio").find(":selected").val(),
                    Nome: nomeSala,
                    NumeroPostiDisponibili: postiSala,
                    Stato: (_c = $("#statoSala").val()) === null || _c === void 0 ? void 0 : _c.toString().trim(),
                };
                if (edificio && nomeSala && postiSala) {
                    index_1.ViewIndex.regex.test(edificio) && index_1.ViewIndex.regex.test(nomeSala) ? services_1.Services.createRoom(sala) : alert("Non puoi inserire caratteri speciali.");
                }
                else {
                    alert("Compila tutti i campi!");
                    event.stopPropagation();
                }
            });
        }
        ;
        searchSale() {
            // Recupero tutte le sale con i rispettivi edifici
            services_1.Services.getAllRooms().then(saleResponse => {
                let allEdificiProm = services_1.Services.getAllBuildings().then(edifici => {
                    saleResponse.forEach(s => {
                        let edificioTmp = edifici.find(e => e.ID_Edificio === s.ID_Edificio);
                        s.NomeEdificio = edificioTmp ? edificioTmp.Nome : "Not found";
                        console.log("Nome sala" + s.Nome);
                    });
                });
                Promise.all([allEdificiProm]).then(() => {
                    saleResponse.forEach(sala => {
                        this.sale.push(sala);
                    });
                    this.populateSale(this.sale);
                });
            });
        }
        ;
        // stampo a video la tabella con tutte le sale e i relativi dettagli
        populateSale(sale) {
            $.each(sale, (key, sala) => {
                $(".saleTbody").append('<tr class= "saleTr"><td class="nomeSala">' + sala.Nome + '</td><td class="nomeEdificio">' + sala.NomeEdificio + '</td><td class="stato">' + sala.Stato + '</td></tr>');
                $(".saleTbody").append('<tr><td class="numeroPostiDisponibili" colspan="3"><h6> Numero posti disponibili: </h6>' + sala.NumeroPostiDisponibili + '</td></tr>');
            });
            $('.saleTr').click(function () {
                $(this).nextUntil('.saleTr').toggleClass('hide');
            }).click();
        }
        ;
        // gestisco il popolamento della dropdown con tutti gli edifici che abbiano stato disponibile
        populateEdificiNames() {
            services_1.Services.getAllBuildings().then(edificiResponse => {
                $.each(edificiResponse, (key, item) => {
                    if (item.Stato === "Disponibile") {
                        $('#selectEdificio').append(`<option name = "${item.Nome}" value = "${item.ID_Edificio}"> ${item.Nome}</option>`);
                    }
                });
            });
        }
        ;
    }
    exports.ViewSale = ViewSale;
});
