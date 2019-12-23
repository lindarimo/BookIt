import { getAllPrenotazioni, getRisorsa, getAllRisorse, getAllUsersCanBook, getSala } from "./services";
import { Prenotazione, Risorsa } from "./model";

$(document).ready(() => {
    console.log("loaded");
    let prenotazioni = getAllPrenotazioni();
})
$("#getAllPrenotazioni").click(function () {
    getAllPrenotazioni();
})

export function populatePrenotazioni(prenotazioni: Prenotazione[]) {
    $.each(prenotazioni, (key, prenotazione: Prenotazione) => {
        getSala(prenotazione.ID_Sala).then(sala => {
            $(".prenotazioniTbody").append('<tr class= "prenotazioniTr"><td class="nomeSala">' + sala.Nome + '</td><td class="dataInizio">' + prenotazione.DataInizioPrenotazione + '</td><td class="dataFine">' + prenotazione.DataFinePrenotazione + '</td><td></td></tr>');
        });
        getRisorsa(prenotazione.ID_Risorsa).then(risorsa => {
            // $(".prenotazioniTbody").append('<tr><td>' + item.Username + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td><td><button class="flagPrenotazioneButton" id="' + item.ID + '">Abilita utente alla prenotazione</button></td></tr>');
        });

        $('.prenotazioniTr').click(function () {
            $(this).nextUntil('.prenotazioniTr').toggleClass('hide');
        }).click();
    })
}
