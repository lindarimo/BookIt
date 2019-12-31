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
                $(".risorseTbody").append('<tr class= "risorseTr"><td class="cognome">' + item.Cognome + '</td><td class="nome">' + item.Nome + '</td></tr>');
                if (item.FlagPrenotazione == false) {
                    $(".risorseTbody").append('<tr class = "dettagliTable"><td colspan="2"><b>Username: </b>' + item.Username + '<br><b>Email: </b>' + item.Email + '<br><div class="text-center redText textDiv">Utente non abilitato alla prenotazione</div><div class="text-center textDiv"><button class="flagPrenotazioneButton btn btn-danger createButton" id="' + item.ID + '">Abilita</button></div></td></tr>');
                }
                else {
                    $(".risorseTbody").append('<tr class = "dettagliTable"><td colspan="2"><b>Username: </b>' + item.Username + '<br><b>Email: </b>' + item.Email + '<br><div class="text-center textDiv">Utente abilitato alla prenotazione</div></td></tr>');
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