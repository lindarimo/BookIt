define(["require", "exports", "./services", "./prenotazioni"], function (require, exports, services_1, prenotazioni_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewIndex {
        constructor() {
            $(document).ready(() => {
                console.log("loaded");
                //getAllUsernames();
                var edificioName = $('#getAllSaleByEdificio').attr('name') || '';
                console.log(edificioName);
                services_1.getAllEdificiNames();
                services_1.getAllUsersCanBook();
                services_1.getAllSale().then(sale => {
                    console.log(sale);
                    sale.forEach(sala => {
                        $(".listaSale").append('<li>' + sala.Nome + '</li>');
                    });
                });
            });
        }
        /**
         * PrintIndexInfos
         */
        PrintIndexInfos() {
            $("#getAllSaleByEdificio").click(function () {
                var nomeEdificio = $('option:selected', this).text();
                services_1.getAllSaleByEdificio(nomeEdificio.trim());
            });
            $("#selectEdificio").on("change", function () {
                $('.salaItem').remove();
                $("#selectSala").removeAttr('disabled');
                $(".selectDefault").prop('disabled', true);
                let idEdificio = $(this).val();
                services_1.getAllSaleByEdificio(idEdificio);
            });
            $("#bookDateStart").on("change", function () {
                let initDate = $("#bookDateStart").val();
                console.log(initDate);
                $("#bookDateEnd").removeAttr('disabled');
                $("#bookDateEnd").attr("min", initDate);
            });
            $("#bookDateEnd").focusout(function () {
                let initDate = $("#bookDateStart").val();
                let endDate = $("#bookDateEnd").val();
                if (initDate && endDate && initDate >= endDate) {
                    alert("Attenzione! La data e l'ora di inizio devono essere antecedenti alla data e ora di fine prenotazione!");
                    $("#bookDateEnd").val("");
                }
            });
            $("#creaPrenotazione").click(function (event) {
                event.preventDefault();
                services_1.doPrenotazione();
            });
        }
        populateEdificiNames(names) {
            $.each(names, (key, item) => {
                $('#selectEdificio').append(`<option name = "${item.Nome}" value = "${item.ID_Edificio}"> ${item.Nome}</option>`);
            });
        }
        populateUsernames(usernames) {
            $.each(usernames, (key, item) => {
                $('#selectUsername').append(`<option name = "${item.Username}" value = "${item.ID}"> ${item.Username}</option>`);
            });
        }
        populateSale(sale) {
            $.each(sale, (key, item) => {
                $('#selectSala').append(`<option class = "salaItem" name = "${item.Nome}" value = "${item.ID_Sala}"> ${item.Nome}</option>`);
            });
        }
    }
    exports.ViewIndex = ViewIndex;
    let viewIndex = new ViewIndex();
    let viewPrenotazioni = new prenotazioni_1.ViewPrenotazioni();
});
