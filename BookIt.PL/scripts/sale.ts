import { getAllSale, getAllEdifici, creaSala } from "./services";
import { Sala, Edificio } from "./model";
import { ViewIndex } from "./index";

export class ViewSale {
    public sale: Sala[] = [];
    public constructor() {
        $(document).ready(() => {
            console.log("loaded");
            this.searchSale();
            this.populateEdificiNames();
        });
        $("#selectEdificio").on("change", function () {
            $('.salaItem').remove();
            $("#selectSala").removeAttr('disabled');
            $(".selectDefault").prop('disabled', true);
        });
        $("#selectEdificio").on("change", function () {
            $(".selectDefault").prop('disabled', true);
        });
        $("#creaSala").click(function (event) {
            event.preventDefault();
            let edificio = $("#selectEdificio").val()?.toString().trim();
            let nomeSala = $("#nomeSala").val()?.toString().trim();
            let postiSala = $("#postiSala").val();
            let sala = {
                ID_Edificio: $("#selectEdificio").find(":selected").val(),
                Nome: nomeSala,
                NumeroPostiDisponibili: postiSala,
                Stato: $("#statoSala").val()?.toString().trim(),
            };
            if (edificio && nomeSala && postiSala) {
                ViewIndex.regex.test(edificio) && ViewIndex.regex.test(nomeSala) ? creaSala(sala) : alert("Non puoi inserire caratteri speciali.");
            } else {
                alert("Compila tutti i campi!");
                event.stopPropagation();
            }
        });
    };

    public searchSale() {
        getAllSale().then(saleResponse => {
            let allEdificiProm = getAllEdifici().then(edifici => {
                saleResponse.forEach(s => {
                    let edificioTmp = edifici.find(e => e.ID_Edificio === s.ID_Edificio);
                    s.NomeEdificio = edificioTmp ? edificioTmp.Nome : "Not found";
                    console.log("Nome sala" + s.Nome);
                });
            });
            Promise.all([allEdificiProm]).then(() => {
                saleResponse.forEach(sala => {
                    this.sale.push(sala);
                });
                this.populateSale(this.sale);
            });
        });
    };
    public populateSale(sale: Sala[]) {
        console.log(sale);
        $.each(sale, (key, sala: Sala) => {
            $(".saleTbody").append('<tr class= "saleTr"><td class="nomeSala">' + sala.Nome + '</td><td class="nomeEdificio">' + sala.NomeEdificio + '</td><td class="stato">' + sala.Stato + '</td></tr>');
            $(".saleTbody").append('<tr><td class="numeroPostiDisponibili" colspan="3"><h6> Numero posti disponibili: </h6>' + sala.NumeroPostiDisponibili + '</td></tr>')
        });
        $('.saleTr').click(function () {
            $(this).nextUntil('.saleTr').toggleClass('hide');
        }).click();
    };

    public populateEdificiNames() {
        getAllEdifici().then(edificiResponse => {
            $.each(edificiResponse, (key, item: Edificio) => {
                if (item.Stato === "Disponibile") {
                    $('#selectEdificio').append(`<option name = "${item.Nome}" value = "${item.ID_Edificio}"> ${item.Nome}</option>`);
                }
            });
        });
    };
}