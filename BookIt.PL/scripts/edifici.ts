import { getAllEdifici, creaEdificio, getAllSaleByEdificio } from "./services";
import { Edificio, Sala } from "./model";
import { ViewIndex } from "./index";
export class ViewEdifici {
    public edifici: Edificio[] = [];
    public constructor() {
        $(document).ready(() => {
            this.searchEdifici();
        });
        $("#creaEdificio").click(function (event) {
            event.preventDefault();
            let nomeEdificio = $("#nomeEdificio").val()?.toString().trim();
            let indirizzioEdificio = $("#indirizzoEdificio").val()?.toString().trim();
            let disponibilitaEdificio = $("#disponibilitaEdificio").val()?.toString().trim();
            let edificio = {
                Nome: nomeEdificio,
                Indirizzo: indirizzioEdificio,
                Stato: disponibilitaEdificio,
            }
            if (nomeEdificio && indirizzioEdificio && disponibilitaEdificio) {
                ViewIndex.regex.test(nomeEdificio) && ViewIndex.regex.test(indirizzioEdificio) ? creaEdificio(edificio) : alert("Non puoi inserire caratteri speciali.");
            } else {
                alert("Compila tutti i campi!");
                event.stopPropagation();
            }
        });
    }
    /**
     * searchEdifici
     */
    public searchEdifici() {
        let saleArray: Sala[];
        let allSaleProm: any;
        getAllEdifici().then(edificiResponse => {
            $.each(edificiResponse, (key, edificio: Edificio) => {
                allSaleProm = getAllSaleByEdificio(edificio.ID_Edificio).then(e => {
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
    };

    public populateEdifici(edifici: Edificio[]) {
        $.each(edifici, (key, edificio: Edificio) => {
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
    };
}