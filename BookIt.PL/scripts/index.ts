import { getAllSaleByEdificio, getAllEdifici, getAllUsersCanBook, doPrenotazione, getAllSale } from "./services";
import { Edificio, Risorsa, Sala, Prenotazione } from "./model";
import { ViewPrenotazioni } from "./prenotazioni";
import { ViewRisorse } from "./risorse";
import { ViewEdifici } from "./edifici";
import { ViewSale } from "./sale";

export class ViewIndex {
    public static regex : RegExp = /^[a-zA-Z0-9]+$/;

    public constructor() {
        $(document).ready(() => {
            console.log("loaded");
            //getAllUsernames();
            var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
            console.log(edificioName);
            getAllSale().then(sale => {
                console.log(sale);
                sale.forEach(sala => {
                    $(".listaSale").append('<li>' + sala.Nome + '</li>')
                });
            })
        })
    }

}
let viewIndex: ViewIndex = new ViewIndex();
let viewPrenotazioni: ViewPrenotazioni = new ViewPrenotazioni();
let viewRisorse: ViewRisorse = new ViewRisorse();
let viewEdifici: ViewEdifici = new ViewEdifici();
let viewSale: ViewSale = new ViewSale(); 