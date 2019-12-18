define(["require", "exports", "./services"], function (require, exports, services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        console.log("loaded");
        services_1.getAllUsernames();
        var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
        console.log(edificioName);
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
    // $("#creaPrenotazione").click(function() {
    //     doPrenotazione();
    // })
    function populateUsernames(usernames) {
        $.each(usernames, function (key, item) {
            $('#selectUsername').append("<option name = \"" + item.Username + "\" value = \"" + item.ID + "\"> " + item.Username + "</option>");
        });
    }
    exports.populateUsernames = populateUsernames;
    function populateSale(sale) {
        for (var element in sale) {
            console.log(sale[element]);
            $('#selectSala').append('<option class = "salaItem">' + sale[element] + '</option>');
        }
    }
    exports.populateSale = populateSale;
});
