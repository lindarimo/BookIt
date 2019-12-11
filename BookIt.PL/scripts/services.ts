import { Risorsa, Edificio, Sala, Prenotazione } from "./model";

//#region Variables
const webApiUri: string = 'http://localhost:60398/api';
//#endregion

export function getAllRisorse() {
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done((risorse: Risorsa[]) => {
            console.log(risorse);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
}
export function getAllUsernames(): Array<string> {
    var risorseArray: Array<string> = [];
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done((risorse: Risorsa[]) => {
            $.each(risorse, (key, item: Risorsa) => {
                risorseArray.push(item.Username);
            })
            console.log(risorseArray);
            //console.log(risorse);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
    return risorseArray;
}
export function getAllEdifici() {
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done((edifici: Edificio[]) => {
            console.log(edifici);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione degli edifici!');
        }
        );
}
export function getAllSale() {
    $.getJSON(webApiUri + '/Sala/GetAllSale')
        .done((sale: Sala[]) => {
            console.log(sale);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle sale!');
        }
        );
}
export function getAllPrenotazioni() {
    $.getJSON(webApiUri + '/Prenotazione/GetAllPrenotazioni')
        .done((prenotazioni: Prenotazione[]) => {
            console.log(prenotazioni);

        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle prenotazioni!');
        }
        );
}
export function creaRisorsa(): void {
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
export function aggiornaRisorsa(): void {
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

export function getRisorsa(id: number): void {
    var id = 11;
    $.getJSON(webApiUri + '/User/GetUser/?id=' + id)
        .done(function (data) {
            console.log(JSON.stringify(data));
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('An error occurred while retrieving UserTitle details');
        });
}

export function creaEdificio(): void {
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

export function creaSala(): void {
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

export function deletePrenotazione(): void {
    var id = 1;
    $.ajax({
        type: "DELETE",
        url: webApiUri + '/Prenotazione/DeletePrenotazione/?id=' + id,
        contentType: 'application/json',
    }).done(function (data) {
        console.log(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}