import { getAllUsernames, getAllSaleByEdificio } from "./services";
import { Edificio, Risorsa } from "./model";

$(document).ready(() => {
    console.log("loaded");
    getAllUsernames();
    var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
    console.log(edificioName);

})


// $("#getAllSaleByEdificio").click(function () {
//     var nomeEdificio = $('option:selected', this).text();
//     console.log(nomeEdificio.trim());
//     getAllSaleByEdificio(nomeEdificio.trim());
// });

$("#selectEdificio").on("change", function () {
    $('.salaItem').remove();
    console.log($(this).find(":selected").val());
    let idEdificio = $(this).val();
    getAllSaleByEdificio(idEdificio);
});
// $("#creaPrenotazione").click(function() {
//     doPrenotazione();
// })

export function populateUsernames(usernames: Risorsa[]) {
    $.each(usernames, (key, item: Risorsa) => {
        $('#selectUsername').append(`<option name = "${item.Username}" value = "${item.ID}"> ${item.Username}</option>`)
    });
}


export function populateSale(sale: String[]) {
    for (var element in sale) {
        console.log(sale[element]);
        $('#selectSala').append('<option class = "salaItem">' + sale[element] + '</option>')
    }
}