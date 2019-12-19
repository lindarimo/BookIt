import { getAllEdifici, creaEdificio } from "./services";
import { Edificio } from "./model";

$(document).ready(() => {
    console.log("loaded");
    getAllEdifici();
    var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
    console.log(edificioName);

})
$("#creaEdificio").click(function () {
    creaEdificio();
});
export function populateEdifici(edifici: Edificio[]) {
    $.each(edifici, (key, item: Edificio) => {
        $(".edificiTbody").append('<tr class= "edificiTr"><td class="nome">' + item.Nome + '</td><td class="indirizzo">' + item.Indirizzo + '</td><td class="stato">' + item.Stato + '</td></tr>');
    });
}