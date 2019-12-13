define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        services_1.getAllUsernames();
        services_1.getAllEdifici();
        var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
        console.log(edificioName);
    });
    $("#getAllRisorse").click(function () {
        services_1.getAllRisorse();
    });
    // $("#getAllSaleByEdificio").click(function () {
    //     var nomeEdificio = $('option:selected', this).text();
    //     console.log(nomeEdificio.trim());
    //     getAllSaleByEdificio(nomeEdificio.trim());
    // });
    $("#selectEdificio").on("change", function () {
        $('.salaItem').remove();
        console.log($(this).find(":selected").val());
        var idEdificio = $(this).val();
        services_1.getAllSaleByEdificio(idEdificio);
    });
    function populateUsernames(usernames) {
        for (var element in usernames) {
            console.log(usernames[element]);
            $('#selectUsername').append('<option>' + usernames[element] + '</option>');
        }
    }
    exports.populateUsernames = populateUsernames;
    function populateEdifici(edifici) {
        $.each(edifici, function (key, item) {
            $('#selectEdificio').append("<option name = \"" + item.Nome + "\" value = \"" + item.ID_Edificio + "\"> " + item.Nome + "</option>");
        });
    }
    exports.populateEdifici = populateEdifici;
    function populateSale(sale) {
        for (var element in sale) {
            console.log(sale[element]);
            $('#selectSala').append('<option class = "salaItem">' + sale[element] + '</option>');
        }
    }
    exports.populateSale = populateSale;
});
