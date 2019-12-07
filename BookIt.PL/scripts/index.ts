export class Risorsa {
    public ID: number;
    public Cognome: string;
    public Nome: string;
    public Username: string;
    public Email: string;
    public FlagPrenotazione: boolean;
}
export class Edificio {
    public ID_Edificio: number;
    public Nome: string;
    public Indirizzo: string;
    public Stato: string;
}
export class Sala {
    public ID_Sala: number;
    public ID_Edificio: number;
    public Nome: string;
    public NumeroPostiDisponibili: number;
    public Stato: string;
}
export class Prenotazione {
    public ID_Prenotazione: number;
    public ID_Risorsa: number;
    public ID_Sala: number;
    public Descrizione: string;
    public DataInizioPrenotazione: number;
    public DataFinePrenotazione: string;
}

//#region Variables
const webApiUri: string = 'http://localhost:60398/api';
//#endregion

function getAllRisorse() {
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done((risorse: Risorsa[]) => {
            console.log(risorse);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
    $.getJSON(webApiUri + '/User/GetAllEdifici')
        .done((edifici: Edificio[]) => {
            console.log(edifici);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione degli edifici!');
        }
        );
    $.getJSON(webApiUri + '/User/GetAllSale')
        .done((sale: Sala[]) => {
            console.log(sale);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle sale!');
        }
        );
    $.getJSON(webApiUri + '/User/GetAllPrenotazioni')
        .done((prenotazioni: Prenotazione[]) => {
            console.log(prenotazioni);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle prenotazioni!');
        }
        );
}


$(document).ready(function () {
    var p = new Risorsa();
});
//# sourceMappingURL=scripts.js.map