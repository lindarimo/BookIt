import { getAllUsernames, getAllSaleNames, getAllRisorse, getAllSaleByEdificio, getAllEdifici } from "./services";
import { Edificio } from "./model";

$(document).ready(() => {
    console.log("loaded");
    getAllUsernames();
    getAllEdifici();
    var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
    console.log(edificioName);
})

$("#getAllRisorse").click(function () {
    getAllRisorse();
});

// $("#getAllSaleByEdificio").click(function () {
//     var nomeEdificio = $('option:selected', this).text();
//     console.log(nomeEdificio.trim());
//     getAllSaleByEdificio(nomeEdificio.trim());
// });

$("#selectEdificio").on("change", function () {
    $('.salaItem').remove();
    console.log($(this).find(":selected").val() );
    let idEdificio = $(this).val();
    getAllSaleByEdificio(idEdificio);
});

export function populateUsernames(usernames: String[]) {
    for (var element in usernames) {
        console.log(usernames[element]);
        $('#selectUsername').append('<option>' + usernames[element] + '</option>')
    }
}
export function populateEdifici(edifici: Edificio[]) {
    $.each(edifici, (key, item: Edificio) => {
        $('#selectEdificio').append(`<option name = "${item.Nome}" value = "${item.ID_Edificio}"> ${item.Nome}</option>`)
    });
}

export function populateSale(sale: String[]) {
    for (var element in sale) {
        console.log(sale[element]);
        $('#selectSala').append('<option class = "salaItem">' + sale[element] + '</option>')
    }
}