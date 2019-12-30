import { getAllEdifici, creaEdificio, getAllSaleByEdificio } from "./services";
import { Edificio } from "./model";
import { ViewIndex } from "./index";
export class ViewEdifici {
    public constructor() {
        $(document).ready(() => {
            this.searchEdifici();
        });
        $("#creaEdificio").click(function (event) {
            event.preventDefault();
            let nomeEdificio = $("#nomeEdificio").val()?.toString().trim();
            let indirizzioEdificio = $("#indirizzoEdificio").val()?.toString().trim();
            let disponibilitaEdificio = $("#disponibilitaEdificio").val()?.toString().trim();
            if (nomeEdificio && indirizzioEdificio && disponibilitaEdificio) {
                ViewIndex.regex.test(nomeEdificio) && ViewIndex.regex.test(indirizzioEdificio) ? creaEdificio() : alert("Non puoi inserire caratteri speciali.");       
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
        getAllEdifici().then(edificiResponse => {
            $.each(edificiResponse, (key, edificio: Edificio) => {
                getAllSaleByEdificio(edificio.ID_Edificio).then(e => {
                    $(".edificiTbody").append('<tr class= "edificiTr"><td class="nomeEdificio">' + edificio.Nome + '</td><td class="indirizzo">' + edificio.Indirizzo + '</td><td class="stato">' + edificio.Stato + '</td></tr>');
                    let saleArray = e.filter(r => r.ID_Edificio === edificio.ID_Edificio);
                    if (saleArray) {
                        $(".edificiTbody").append('<tr><h6Sale:>')
                        saleArray.forEach(element => {
                            $(".edificiTbody").append('<li class="nomeSala">' + element.Nome + '</li>')
                        });
                    }
                })

            });
            $('.edificiTr').click(function () {
                $(this).nextUntil('.edificiTr').toggleClass('hide');
            }).click();
        });

    }
}