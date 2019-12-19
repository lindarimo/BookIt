import { getAllSaleByEdificio, getAllEdifici, getAllEdificiNames, getAllUsersCanBook, doPrenotazione } from "./services";
import { Edificio, Risorsa, Sala } from "./model";

$(document).ready(() => {
    console.log("loaded");
    //getAllUsernames();
    var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
    console.log(edificioName);
    getAllEdificiNames();
    getAllUsersCanBook();
})

$("#getAllSaleByEdificio").click(function () {
    var nomeEdificio = $('option:selected', this).text();
    getAllSaleByEdificio(nomeEdificio.trim());
});

$("#selectEdificio").on("change", function () {
    $('.salaItem').remove();
    $("#selectSala").removeAttr('disabled');
    $(".selectDefault").prop('disabled', true);

    let idEdificio = $(this).val();
    getAllSaleByEdificio(idEdificio);
});
$("#bookDateStart").on("change", function () {
    let initDate: any = $("#bookDateStart").val();
    console.log(initDate);
    $("#bookDateEnd").removeAttr('disabled');
    $("#bookDateEnd").attr("min", initDate);
})
$("#bookDateEnd").focusout(function() {
    let initDate = $("#bookDateStart").val();
    let endDate = $("#bookDateEnd").val();
    if (initDate && endDate && initDate >= endDate) {
        alert ("Attenzione! La data e l'ora di inizio devono essere antecedenti alla data e ora di fine prenotazione!");
        $("#bookDateEnd").val("");
    }
})
$("#creaPrenotazione").click(function (event) {
    event.preventDefault();
    doPrenotazione();
})

export function populateUsernames(usernames: Risorsa[]) {
    $.each(usernames, (key, item: Risorsa) => {
        $('#selectUsername').append(`<option name = "${item.Username}" value = "${item.ID}"> ${item.Username}</option>`)
    });
}

export function populateSale(sale: Sala[]) {
    $.each(sale, (key, item: Sala) => {
        $('#selectSala').append(`<option class = "salaItem" name = "${item.Nome}" value = "${item.ID_Sala}"> ${item.Nome}</option>`)
    });
}

// export function populateSale(sale: String[]) {
//     for (var element in sale) {
//         console.log(sale[element]);
//         $('#selectSala').append('<option class = "salaItem" value = "">' + sale[element] + '</option>')
//     }
// }
export function populateEdificiNames(names: Edificio[]) {
    $.each(names, (key, item: Edificio) => {
        $('#selectEdificio').append(`<option name = "${item.Nome}" value = "${item.ID_Edificio}"> ${item.Nome}</option>`)
    });
}
