define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        //getAllUsernames();
        var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
        console.log(edificioName);
        services_1.getAllEdificiNames();
        services_1.getAllUsersCanBook();
    });
    $("#getAllSaleByEdificio").click(function () {
        var nomeEdificio = $('option:selected', this).text();
        services_1.getAllSaleByEdificio(nomeEdificio.trim());
    });
    $("#selectEdificio").on("change", function () {
        $('.salaItem').remove();
        $("#selectSala").removeAttr('disabled');
        $(".selectDefault").prop('disabled', true);
        var idEdificio = $(this).val();
        services_1.getAllSaleByEdificio(idEdificio);
    });
    $("#bookDateStart").on("change", function () {
        var initDate = $("#bookDateStart").val();
        console.log(initDate);
        $("#bookDateEnd").removeAttr('disabled');
        $("#bookDateEnd").attr("min", initDate);
    });
    $("#bookDateEnd").focusout(function () {
        var initDate = $("#bookDateStart").val();
        var endDate = $("#bookDateEnd").val();
        if (initDate && endDate && initDate >= endDate) {
            alert("Attenzione! La data e l'ora di inizio devono essere antecedenti alla data e ora di fine prenotazione!");
            $("#bookDateEnd").val("");
        }
    });
    $("#creaPrenotazione").click(function (event) {
        event.preventDefault();
        services_1.doPrenotazione();
    });
    function populateUsernames(usernames) {
        $.each(usernames, function (key, item) {
            $('#selectUsername').append("<option name = \"" + item.Username + "\" value = \"" + item.ID + "\"> " + item.Username + "</option>");
        });
    }
    exports.populateUsernames = populateUsernames;
    function populateSale(sale) {
        $.each(sale, function (key, item) {
            $('#selectSala').append("<option class = \"salaItem\" name = \"" + item.Nome + "\" value = \"" + item.ID_Sala + "\"> " + item.Nome + "</option>");
        });
    }
    exports.populateSale = populateSale;
    // export function populateSale(sale: String[]) {
    //     for (var element in sale) {
    //         console.log(sale[element]);
    //         $('#selectSala').append('<option class = "salaItem" value = "">' + sale[element] + '</option>')
    //     }
    // }
    function populateEdificiNames(names) {
        $.each(names, function (key, item) {
            $('#selectEdificio').append("<option name = \"" + item.Nome + "\" value = \"" + item.ID_Edificio + "\"> " + item.Nome + "</option>");
        });
    }
    exports.populateEdificiNames = populateEdificiNames;
});
