import { Prenotazione, Risorsa, Sala } from "./model";
import * as moment from "moment";
import { ViewIndex } from "./index";
import { Services } from "./services";

export class ViewPrenotazioni {
    public prenotazioni: Prenotazione[] = [];
    public constructor() {
        $(document).ready(() => {
            let inputText = <string>$('input[type="text"]').val();
            this.searchPrenotazioni();
            this.populateUsernames();
            this.prenotazioneModal();
            // Setto la data attuale come valore minimo dell'input datetime
            $('#bookDateStart').attr({ min: moment().format("YYYY-MM-DD") + "T00:00" });
            // Keyup sull'input per la ricerca di prenotazioni
            $("#myInput").keyup(() => {
                inputText = <string>$('input[type="text"]').val();
                this.filterPrenotazioni(inputText);
            });
        });
        // Gestisco il click per creare una nuova prenotazione
        $("#creaPrenotazione").click(function (event) {
            event.preventDefault();
            let descrizione = $("#descrizione").val()?.toString().trim();
            let selectUsername = $("#selectUsername").val();
            let selectEdificio = $("#selectEdificio").val();
            let selectSala = $("#selectSala").val();
            let prenotazione = {
                ID_Risorsa: selectUsername,
                ID_Sala: selectSala,
                Descrizione: "fdfd",
                DataInizioPrenotazione: $('#bookDateStart').val(),
                DataFinePrenotazione: $('#bookDateEnd').val()
            };
            // Controllo se sono stati inseriti caratteri speciali negli input
            if (descrizione && selectUsername && selectEdificio && selectSala) {
                ViewIndex.regex.test(descrizione) ? Services.createReservation(prenotazione) : alert("Non puoi inserire caratteri speciali.");
            } else {
                alert("Compila tutti i campi!");
                event.stopPropagation();
            }
        });

    };
    /**
     * Metodo che gestisce il popolamento delle risorse, edifici, sale nella modale
     */
    public prenotazioneModal() {
        $("#selectUsername").on("change", function () {
            $(".selectDefault").prop('disabled', true);
        });
        // Al cambio della selezione di un edifici nella select, abilito la select delle sale e popolo le option in base a quale edificio è
        // stato selezionato
        $("#selectEdificio").on("change", function () {
            $('.salaItem').remove();
            $("#selectSala").removeAttr('disabled');
            $(".selectDefault").prop('disabled', true);
            let a = $("#selectEdificio").val()?.toString() || '';
            Services.getAllRoomsByBuilding(parseInt(a)).then(saleResponse => {
                $.each(saleResponse, (key, item: Sala) => {
                    // Visualizzo solo le sale che hanno stato = prenotabile
                    if (item.Stato === "Prenotabile") {
                        $('#selectSala').append(`<option class = "salaItem" name = "${item.Nome}" value = "${item.ID_Sala}"> ${item.Nome}</option>`);
                    }
                });
            });
        });
        // Quando viene selezionata la data di inizio di una prenotazione, abilito il datetime per inserire la datafine e imposto il minimo
        $("#bookDateStart").on("change", function () {
            let initDate: any = $("#bookDateStart").val();
            $("#bookDateEnd").removeAttr('disabled');
            $("#bookDateEnd").attr("min", initDate);
        })
        // Quando viene cliccato al di fuori del datetime, controllo che la datafine sia maggiore della datainizio
        $("#bookDateEnd").focusout(function () {
            let initDate = $("#bookDateStart").val();
            let endDate = $("#bookDateEnd").val();
            if (initDate && endDate && initDate >= endDate) {
                alert("Attenzione! La data e l'ora di inizio devono essere antecedenti alla data e ora di fine prenotazione!");
                $("#bookDateEnd").val("");
            }
        });
    };

    /**
     * Metodo che popola un oggetto di tutte le prenotazioni con le rispettive risorse e sale
     */
    public searchPrenotazioni() {
        Services.getAllReservations().then(prenotazioniResponse => {
            let allSaleProm = Services.getAllRooms().then(sale => {
                prenotazioniResponse.forEach(p => {
                    let salaTmp = sale.find(s => s.ID_Sala === p.ID_Sala);
                    p.NomeSala = salaTmp ? salaTmp.Nome : "Not found";
                    console.log("Nome sala" + p.NomeSala);
                });
            });
            let allRisorseProm = Services.getAllUsers().then(risorse => {
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
     * Metodo che gestisce la ricerca di prenotazioni. In base all'input presente nella searchbar, popola un array di prenotazioni con tutte quelle prenotazioni che abbiano
     * all'interno del nome sala o dello username risorsa quella stringa
     */
    public filterPrenotazioni(inputText: string) {
        //al keyup filtra e mostra solo un sottinsieme delle prenotazioni
        let prenotazioniFiltrateSala: Prenotazione[] = [];
        let prenotazioniFiltrateUsername: Prenotazione[] = [];
        let inputReg = new RegExp(inputText, "i"); //i = ignorecase
        prenotazioniFiltrateSala = this.prenotazioni.filter(p => inputReg.test(p.NomeSala));
        prenotazioniFiltrateUsername = this.prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
        this.populatePrenotazioni([...new Set([...prenotazioniFiltrateSala, ...prenotazioniFiltrateUsername])]);
    };
    /**
     * Metodo che stampa a video la tabella con tutte le prenotazioni
     */
    public populatePrenotazioni(prenotazioni: Prenotazione[]) {
        $(".prenotazioniTbody").empty();

        $.each(prenotazioni, (key, prenotazione: Prenotazione) => {
            $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + prenotazione.NomeSala + '</td><td class="dataInizio">' + moment(prenotazione.DataInizioPrenotazione).format("DD/MM/YYYY") + ' dalle: ' + moment(prenotazione.DataInizioPrenotazione).format("HH:mm") + ' </td><td class="dataFine">' + moment(prenotazione.DataFinePrenotazione).format("DD/MM/YYYY") + ' dalle: ' + moment(prenotazione.DataFinePrenotazione).format("HH:mm") + '</td></tr>');
            $(".prenotazioniTbody").append('<tr class = "dettagliTable"><td><span class = "redText">Dettagli della prenotazione: </span><br><b>Cognome: </b>' + prenotazione.CognomeRisorsa + '<br><b>Nome: </b>' + prenotazione.NomeRisorsa + '<br><b>Username: </b>' + prenotazione.UsernameRisorsa + '</td><td colspan="2"><br><b>Email: </b>' + prenotazione.EmailRisorsa + '<br><b>Descrizione: </b>' + prenotazione.Descrizione + '<br><hr><button type="button" class="btn btn-danger eliminaPrenotazione" id="' + prenotazione.ID_Prenotazione + '">Elimina</button></td></tr>');
        })
        $('.prenotazioniTr').click(function () {
            $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
        }).click();
        $(".eliminaPrenotazione").click(function () {
            if (confirm('Stai per eliminare una prenotazione. Vuoi procedere?')) {
                Services.deleteReservation(parseInt(this.id));
            }
        });
    };

    // Stampo tutti gli utenti che possono prenotare una sala all'interno della select nella modal
    public populateUsernames() {
        Services.getAllUsersCanBook().then(usersResponse => {
            $.each(usersResponse, (key, item: Risorsa) => {
                $('#selectUsername').append(`<option name = "${item.Username}" value = "${item.ID}"> ${item.Username}</option>`)
            });
        })
    };
}
