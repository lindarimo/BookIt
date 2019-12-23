import { getAllPrenotazioni, getRisorsa, getAllRisorse, getAllUsersCanBook, getSala } from "./services";
import { Prenotazione, Risorsa } from "./model";

$(document).ready(() => {
    console.log("loaded");
    let inputText = <string>$('input[type="text"]').val();
    SearchPrenotazioni(inputText);
    $("#myInput").keyup(() => {
        inputText = <string>$('input[type="text"]').val();
        SearchPrenotazioni(inputText);
    });
})

$("#getAllPrenotazioni").click(function () {
    getAllPrenotazioni();
})
export function SearchPrenotazioni(inputText: string) {
    getAllPrenotazioni().then(prenotazioni => {
        let prenotazioniFiltrate: Prenotazione[] = [];
        if (inputText.length !== 0) {
            prenotazioni.forEach(prenotazione => {
                if (prenotazione.Descrizione.indexOf(inputText) > -1) {
                    prenotazioniFiltrate.push(prenotazione);
                }
            });
            populatePrenotazioni(prenotazioniFiltrate);

            console.log("filtrate" + prenotazioniFiltrate)
        }
        else {
            prenotazioni.forEach(prenotazione => {
                prenotazioniFiltrate.push(prenotazione);
            })
            populatePrenotazioni(prenotazioniFiltrate);
        }
        return prenotazioniFiltrate;
    });

}

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

