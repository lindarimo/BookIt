import { getAllPrenotazioni, getRisorsa, getAllRisorse, getAllUsersCanBook, getSala, getAllSale } from "./services";
import { Prenotazione, Risorsa } from "./model";
import * as moment from "moment";

export class ViewPrenotazioni {
    public prenotazioni: Prenotazione[] = [];
    public constructor() {
        $(document).ready(() => {
            console.log("loaded");
            let inputText = <string>$('input[type="text"]').val();
            this.searchPrenotazioni();
            $("#myInput").keyup(() => {
                inputText = <string>$('input[type="text"]').val();
                this.filterPrenotazioni(inputText);
            });
        })
    }
    /**
     * getAllPrenotazioniView
     */
    public getAllPrenotazioniView() {
        $("#getAllPrenotazioni").click(function () {
            getAllPrenotazioni();
        })
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
            $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + prenotazione.NomeSala + '</td><td class="dataInizio">' + moment(prenotazione.DataInizioPrenotazione).format("DD/MM/YYYY") + '</td><td class="dataFine">' + moment(prenotazione.DataFinePrenotazione).format("DD/MM/YYYY") + '</td><td></td><td></td></tr>');
            $(".prenotazioniTbody").append('<tr><td>' + prenotazione.CognomeRisorsa + '</td><td>' + prenotazione.NomeRisorsa + '</td><td>' + prenotazione.UsernameRisorsa + '</td><td>' + prenotazione.EmailRisorsa + '</td><td>' + prenotazione.Descrizione + '</td></tr>');
        })
        $('.prenotazioniTr').click(function () {
            $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
        }).click();
    }

}
