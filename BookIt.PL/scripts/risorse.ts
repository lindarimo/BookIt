import { getAllRisorse, creaRisorsa, aggiornaRisorsa, getAllUsersCanBook } from "./services";
import { Risorsa } from "./model";
import { ViewIndex } from "./index";

export class ViewRisorse {
    public constructor() {
        $(document).ready(() => {
            console.log("loaded");
            this.searchRisorse();
        });  
        $("#creaRisorsa").click(function (event) {
            event.preventDefault();
            let cognome = $("#cognome").val()?.toString().trim();
            let nome = $("#nome").val()?.toString().trim();
            if(cognome && nome ) {
                if(cognome.length > 4 && nome.length > 1) {
                    ViewIndex.regex.test(cognome) && ViewIndex.regex.test(nome) ? creaRisorsa() : alert("Non puoi inserire caratteri speciali.");
                }
                else {
                    alert("Il cognome deve essere di almeno 5 caratteri e il nome di 2 caratteri.");
                }
            } else {
                alert("Compila tutti i campi!");
                event.stopPropagation();
            }
        });        
    };

    /**
     * searchRisorse
     */
    public searchRisorse() {
        getAllRisorse().then(risorseResponse => {
            $.each(risorseResponse, (key, item: Risorsa) => {
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
            });
        })
    }

}