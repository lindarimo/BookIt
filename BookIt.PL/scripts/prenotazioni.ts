import { getAllPrenotazioni, getRisorsa, getAllRisorse, getAllUsersCanBook, getSala, getAllSale, getAllSaleByEdificio, doPrenotazione, deletePrenotazione } from "./services";
import { Prenotazione, Risorsa, Sala } from "./model";
import * as moment from "moment";
import { ViewIndex } from "./index";

export class ViewPrenotazioni {
    public prenotazioni: Prenotazione[] = [];
    public constructor() {
        $(document).ready(() => {
            console.log("loaded");
            let inputText = <string>$('input[type="text"]').val();
            this.searchPrenotazioni();
            this.populateUsernames();
            this.prenotazioneModal();
            $("#myInput").keyup(() => {
                inputText = <string>$('input[type="text"]').val();
                this.filterPrenotazioni(inputText);
            });

        });
        $("#creaPrenotazione").click(function (event) {
            event.preventDefault();
            let descrizione = $("#descrizione").val()?.toString().trim();
            let selectUsername = $("#selectUsername").val();
            let selectEdificio = $("#selectEdificio").val();
            let selectSala = $("#selectSala").val();
            if (descrizione && selectUsername && selectEdificio && selectSala) {
                ViewIndex.regex.test(descrizione) ? doPrenotazione() : alert("Non puoi inserire caratteri speciali.");
            } else {
                alert("Compila tutti i campi!");
                event.stopPropagation();
            }
        });

    };
    /**
     * prenotazioneModal
     */
    public prenotazioneModal() {
        $("#selectUsername").on("change", function () {
            $(".selectDefault").prop('disabled', true);
        });
        $("#selectEdificio").on("change", function () {
            $('.salaItem').remove();
            $("#selectSala").removeAttr('disabled');
            $(".selectDefault").prop('disabled', true);
            let a = $("#selectEdificio").val()?.toString() || '';
            getAllSaleByEdificio(parseInt(a)).then(saleResponse => {
                $.each(saleResponse, (key, item: Sala) => {
                    $('#selectSala').append(`<option class = "salaItem" name = "${item.Nome}" value = "${item.ID_Sala}"> ${item.Nome}</option>`);
                });
            });
        });
        $("#bookDateStart").on("change", function () {
            let initDate: any = $("#bookDateStart").val();
            console.log(initDate);
            $("#bookDateEnd").removeAttr('disabled');
            $("#bookDateEnd").attr("min", initDate);
        })
        $("#bookDateEnd").focusout(function () {
            let initDate = $("#bookDateStart").val();
            let endDate = $("#bookDateEnd").val();
            if (initDate && endDate && initDate >= endDate) {
                alert("Attenzione! La data e l'ora di inizio devono essere antecedenti alla data e ora di fine prenotazione!");
                $("#bookDateEnd").val("");
            }
        });

    }

    /**
     * searchPrenotazioni
     */
    public searchPrenotazioni() {
        getAllPrenotazioni().then(prenotazioniResponse => {
            let allSaleProm = getAllSale().then(sale => {
                prenotazioniResponse.forEach(p => {
                    let salaTmp = sale.find(s => s.ID_Sala === p.ID_Sala);
                    p.NomeSala = salaTmp ? salaTmp.Nome : "Not found";
                    console.log("Nome sala" + p.NomeSala);
                });
            });
            let allRisorseProm = getAllRisorse().then(risorse => {
                prenotazioniResponse.forEach(p => {
                    let risorsaTmp = risorse.find(r => r.ID === p.ID_Risorsa);
                    p.UsernameRisorsa = risorsaTmp ? risorsaTmp.Username : "Not found";
                    p.NomeRisorsa = risorsaTmp ? risorsaTmp.Nome : "Not found";
                    p.CognomeRisorsa = risorsaTmp ? risorsaTmp.Cognome : "Not found";
                    p.EmailRisorsa = risorsaTmp ? risorsaTmp.Email : "Not found";
                });
            });
            Promise.all([allSaleProm, allRisorseProm]).then(() => {
                prenotazioniResponse.forEach(prenotazione => {
                    this.prenotazioni.push(prenotazione);
                });
                this.populatePrenotazioni(this.prenotazioni);
            });
        });
    };
    /**
     * filterPrenotazioni
     */
    public filterPrenotazioni(inputText: string) {
        //al keyup filtra e mostra solo un sottinsieme delle prenotazioni
        let prenotazioniFiltrate: Prenotazione[] = [];
        let prenotazioniFiltrateSala: Prenotazione[] = [];
        let prenotazioniFiltrateUsername: Prenotazione[] = [];
        let inputReg = new RegExp(inputText, "i"); //i = ignorecase
        //prenotazioniFiltrate = prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
        prenotazioniFiltrateSala = this.prenotazioni.filter(p => inputReg.test(p.NomeSala));
        prenotazioniFiltrateUsername = this.prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
        prenotazioniFiltrate = prenotazioniFiltrateSala.concat(prenotazioniFiltrateUsername);
        this.populatePrenotazioni(prenotazioniFiltrate);
    };
    /**
     * populatePrenotazioni
     */
    public populatePrenotazioni(prenotazioni: Prenotazione[]) {
        $(".prenotazioniTbody").empty();

        $.each(prenotazioni, (key, prenotazione: Prenotazione) => {
            $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + prenotazione.NomeSala + '</td><td class="dataInizio">' + moment(prenotazione.DataInizioPrenotazione).format("DD/MM/YYYY") + ' dalle: ' + moment(prenotazione.DataInizioPrenotazione).format("HH:mm") + ' </td><td class="dataFine">' + moment(prenotazione.DataFinePrenotazione).format("DD/MM/YYYY") + ' dalle: ' + moment(prenotazione.DataFinePrenotazione).format("HH:mm") + '</td></tr>');
            $(".prenotazioniTbody").append('<tr class = "dettagliPrenotazioni"><td><span class = "redText">Dettagli della prenotazione: </span><br><b>Cognome: </b>' + prenotazione.CognomeRisorsa + '<br><b>Nome: </b>' + prenotazione.NomeRisorsa + '<br><b>Username: </b>' + prenotazione.UsernameRisorsa + '</td><td colspan="2"><br><b>Email: </b>' + prenotazione.EmailRisorsa + '<br><b>Descrizione: </b>' + prenotazione.Descrizione + '<br><hr><button type="button" class="btn btn-danger eliminaPrenotazione" id="' + prenotazione.ID_Prenotazione + '">Elimina</button></td></tr>');
        })
        $('.prenotazioniTr').click(function () {
            $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
        }).click();
        $(".eliminaPrenotazione").click(function () {
            if (confirm('Stai per eliminare una prenotazione. Vuoi procedere?')) {
                deletePrenotazione(parseInt(this.id));
            }
        });
    };
    public populateUsernames() {
        getAllUsersCanBook().then(usersResponse => {
            $.each(usersResponse, (key, item: Risorsa) => {
                $('#selectUsername').append(`<option name = "${item.Username}" value = "${item.ID}"> ${item.Username}</option>`)
            });
        })
    };
}
