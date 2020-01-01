define(["require", "exports", "./prenotazioni", "./risorse", "./edifici", "./sale", "./services"], function (require, exports, prenotazioni_1, risorse_1, edifici_1, sale_1, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewIndex {
        constructor() {
            $(document).ready(() => {
                console.log("loaded");
                services_1.Services.getAllRooms().then(sale => {
                    console.log(sale);
                    sale.forEach(sala => {
                        $(".listaSale").append('<li>' + sala.Nome + '</li>');
                    });
                });
            });
        }
    }
    exports.ViewIndex = ViewIndex;
    // Regex per gestire l'inserimento di caratteri speciali negli input form
    ViewIndex.regex = /^[a-zA-Z0-9 ]+$/;
    let viewIndex = new ViewIndex();
    let viewPrenotazioni = new prenotazioni_1.ViewPrenotazioni();
    let viewRisorse = new risorse_1.ViewRisorse();
    let viewEdifici = new edifici_1.ViewEdifici();
    let viewSale = new sale_1.ViewSale();
    let services = new services_1.Services();
});
