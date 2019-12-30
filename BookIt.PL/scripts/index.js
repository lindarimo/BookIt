define(["require", "exports", "./services", "./prenotazioni", "./risorse", "./edifici", "./sale"], function (require, exports, services_1, prenotazioni_1, risorse_1, edifici_1, sale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewIndex {
        constructor() {
            $(document).ready(() => {
                console.log("loaded");
                //getAllUsernames();
                var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
                console.log(edificioName);
                services_1.getAllSale().then(sale => {
                    console.log(sale);
                    sale.forEach(sala => {
                        $(".listaSale").append('<li>' + sala.Nome + '</li>');
                    });
                });
            });
        }
    }
    exports.ViewIndex = ViewIndex;
    ViewIndex.regex = /^[a-zA-Z0-9]+$/;
    let viewIndex = new ViewIndex();
    let viewPrenotazioni = new prenotazioni_1.ViewPrenotazioni();
    let viewRisorse = new risorse_1.ViewRisorse();
    let viewEdifici = new edifici_1.ViewEdifici();
    let viewSale = new sale_1.ViewSale();
});
