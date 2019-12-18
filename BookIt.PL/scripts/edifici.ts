import { getAllEdifici } from "./services";
import { Edificio } from "./model";

$(document).ready(() => {
    console.log("loaded");
    getAllEdifici();
    var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
    console.log(edificioName);

})
export function populateEdifici(edifici: Edificio[]) {
    $.each(edifici, (key, item: Edificio) => {
        $(".edificiTbody").append('<tr class= "edificiTr"><td class="nome">' + item.Nome + '</td><td class="indirizzo">' + item.Indirizzo + '</td></tr>');
        //$(".edificiTbody").append('<tr><td>' + item.Stato + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td></tr>');
    });
    $('.risorseTr').click(function () {
        $(this).nextUntil('.risorseTr').toggleClass('hide');
    }).click();
}