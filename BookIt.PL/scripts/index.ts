import { ViewPrenotazioni } from "./prenotazioni";
import { ViewRisorse } from "./risorse";
import { ViewEdifici } from "./edifici";
import { ViewSale } from "./sale";
import { Services } from "./services";

export class ViewIndex {
    // Regex per gestire l'inserimento di caratteri speciali negli input form
    public static regex : RegExp = /^[a-zA-Z0-9 ]+$/;

    public constructor() {
        $(document).ready(() => {
            console.log("loaded");
            Services.getAllRooms().then(sale => {
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
let services: Services = new Services();