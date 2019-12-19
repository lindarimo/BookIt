import { getAllRisorse, creaRisorsa, aggiornaRisorsa, getAllUsersCanBook } from "./services";
import { Risorsa } from "./model";

$(document).ready(() => {
    console.log("loaded");
    getAllRisorse();
})
$("#getAllRisorse").click(function () {
    getAllRisorse();
});
$("#creaRisorsa").click(function () {
    creaRisorsa()
});

export function populateRisorse(risorse: Risorsa[]) {
    $.each(risorse, (key, item: Risorsa) => {
        $(".risorseTbody").append('<tr class= "risorseTr"><td class="cognome">' + item.Cognome + '</td><td class="nome">' + item.Nome + '</td><td></td><td></td></tr>');
        if (item.FlagPrenotazione == false) {
            $(".risorseTbody").append('<tr><td>' + item.Username + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td><td><button class="flagPrenotazioneButton" id="' + item.ID + '">Abilita utente alla prenotazione</button></td></tr>');
        }
        else {
            $(".risorseTbody").append('<tr><td>' + item.Username + '</td><td>' + item.Email + '</td><td>' + item.FlagPrenotazione + '</td><td></td></tr>');
        }
    });
    $('.risorseTr').click(function () {
        $(this).nextUntil('.risorseTr').toggleClass('hide');
    }).click();
    $(".flagPrenotazioneButton").click(function () {
        aggiornaRisorsa(parseInt(this.id));
    })
}