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
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done((edifici: Edificio[]) => {
            console.log(edifici);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione degli edifici!');
        }
        );
    $.getJSON(webApiUri + '/Sala/GetAllSale')
        .done((sale: Sala[]) => {
            console.log(sale);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle sale!');
        }
        );
    $.getJSON(webApiUri + '/Prenotazione/GetAllPrenotazioni')
        .done((prenotazioni: Prenotazione[]) => {
            console.log(prenotazioni);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle prenotazioni!');
        }
        );
}
function creaRisorsa(): void {
    var p = { Cognome: "Bianchi", Email: "linda.rimoldi@reti.it", FlagPrenotazione: false, ID: 6, Nome: "Linda", Username: "lalalalala" };
    $.ajax({
        type: "POST",
        url: webApiUri + '/User/PostUser',
        contentType: 'application/json',
        data: JSON.stringify(p),
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}
function aggiornaRisorsa(): void {
    var id = 12;
    var p = { Cognome: "Ciao", Email: "linda.rimoldi@reti.it", FlagPrenotazione: 1, ID: 12, Nome: "Ciao", Username: "rimolli1" };
    $.ajax({
        type: "PUT",
        url: webApiUri + '/User/UpdateUserFlag?id=' + id,
        contentType: 'application/json',
        data: JSON.stringify(p),
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}

function getRisorsa(id: number): void {
    var id = 11;
    $.getJSON(webApiUri + '/User/GetUser/?id=' + id)
        .done(function (data) {
            console.log(JSON.stringify(data));
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while retrieving UserTitle details');
        });
}

function creaEdificio(): void {
    var p = { Nome: "Edificio", Indirizzo: "via verdi 465", Stato: "prenotabile" };
    $.ajax({
        type: "POST",
        url: webApiUri + '/Edificio/PostEdificio',
        contentType: 'application/json',
        data: JSON.stringify(p),
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}

function creaSala(): void {
    var p = { ID_Edificio: 1, Nome: "bella sala", NumeroPostiDisponibili: 6, Stato: "Prenotabile" };
    $.ajax({
        type: "POST",
        url: webApiUri + '/Sala/PostSala',
        contentType: 'application/json',
        data: JSON.stringify(p),
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}

$(document).ready(function () {
    var p = new Risorsa();
});
//# sourceMappingURL=scripts.js.map