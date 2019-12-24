import { getAllPrenotazioni, getRisorsa, getAllRisorse, getAllUsersCanBook, getSala, getAllSale } from "./services";
import { Prenotazione, Risorsa } from "./model";

let prenotazioni: Prenotazione[] = [];

$(document).ready(() => {
    console.log("loaded");
    let inputText = <string>$('input[type="text"]').val();
    SearchPrenotazioni();
    $("#myInput").keyup(() => {
        inputText = <string>$('input[type="text"]').val();
        filterPrenotazioni(inputText);
    });
})

$("#getAllPrenotazioni").click(function () {
    getAllPrenotazioni();
})
export function SearchPrenotazioni() {
    getAllPrenotazioni().then(response => {
        getAllSale().then(sale => {
            response.forEach(p => {
                let salaTmp = sale.find(s => s.ID_Sala === p.ID_Sala);
                p.NomeSala = salaTmp ? salaTmp.Nome : "Not found";
                console.log("Nome sala" + p.NomeSala);
            });
        });
        getAllRisorse().then(risorse => {
            response.forEach(p => {
                let risorsaTmp = risorse.find(r => r.ID === p.ID_Risorsa);
                p.UsernameRisorsa = risorsaTmp ? risorsaTmp.Username : "Not found";
                console.log("username risorsa" + p.UsernameRisorsa);
            })
        })
        response.forEach(prenotazione => {
            prenotazioni.push(prenotazione);
        })
        console.log("NON filtrate" + prenotazioni)
        populatePrenotazioni(prenotazioni);

    });

}

export function filterPrenotazioni(inputText: string) {
    //al keyup filtra e mostra solo un sottinsieme delle prenotazioni
    let prenotazioniFiltrate: Prenotazione[] = [];
    let prenotazioniFiltrateSala: Prenotazione[] = [];
    let prenotazioniFiltrateUsername: Prenotazione[] = [];
    let inputReg = new RegExp(inputText, "i"); //i = ignorecase
    prenotazioniFiltrateSala = prenotazioni.filter(p => inputReg.test(p.NomeSala));
    prenotazioniFiltrateUsername =  prenotazioni.filter(p => inputReg.test(p.UsernameRisorsa));
    prenotazioniFiltrate = prenotazioniFiltrateSala.concat(prenotazioniFiltrateUsername.filter((item) => prenotazioniFiltrateSala.indexOf(item) < 0))
    populatePrenotazioni(prenotazioniFiltrate);
};

export function populatePrenotazioni(prenotazioni: Prenotazione[]) {
    $(".prenotazioniTbody").empty();

    $.each(prenotazioni, (key, prenotazione: Prenotazione) => {
        getSala(prenotazione.ID_Sala).then(sala => {
            getRisorsa(prenotazione.ID_Risorsa).then(risorsa => {
                $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + sala.Nome + '</td><td class="dataInizio">' + prenotazione.DataInizioPrenotazione + '</td><td class="dataFine">' + prenotazione.DataFinePrenotazione + '</td><td></td><td></td></tr>');
                $(".prenotazioniTbody").append('<tr><td>' + risorsa.Cognome + '</td><td>' + risorsa.Nome + '</td><td>' + risorsa.Username + '</td><td>' + risorsa.Email + '</td><td>' + prenotazione.Descrizione + '</td></tr>');
            });
        });
    })
    $('.prenotazioniTr').click(function () {
        $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
    }).click();
}

