import { Risorsa, Edificio, Sala, Prenotazione } from "./model";
import { populateUsernames, populateSale } from "./index";
import { populateRisorse } from "./risorse";
import { populateEdifici } from "./edifici";
//import { populateUsernames, populateEdifici, populateSale } from "./index";

//#region Variables
const webApiUri: string = 'http://localhost:60398/api';
//#endregion

export function getAllUsernames() {
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done((risorse: Risorsa[]) => {
            populateUsernames(risorse);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
}
// export function getAllEdificiNames(): Array<string> {
//     var edificiArray: Array<string> = [];
//     $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
//         .done((edifici: Edificio[]) => {
//             $.each(edifici, (key, item: Edificio) => {
//                 edificiArray.push(item.Nome);
//             })
//             console.log(edificiArray);
//             //console.log(risorse);
//             populateEdifici(edificiArray);
//         })
//         .fail(function (jqXHR, textStatus, err) {
//             alert('Errore durante l estrazione delle risorse!');
//         }
//         );
//     return edificiArray;
// }
export function getAllSaleNames(): Array<string> {
    var saleArray: Array<string> = [];
    $.getJSON(webApiUri + '/Sala/GetAllSale')
        .done((sale: Sala[]) => {
            $.each(sale, (key, item: Sala) => {
                saleArray.push(item.Nome);
            })
            console.log(saleArray);
            //console.log(risorse);
            populateSale(saleArray);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
    return saleArray;
}
export function getAllRisorse() {
    $.getJSON(webApiUri + '/User/GetAllUsers')
        .done((risorse) => {
            populateRisorse(risorse);
        })
        .fail(function (jqXHR, textStatus, err) {
            alert('Errore durante l estrazione delle risorse!');
        }
        );
}

export function getAllSaleByEdificio(id: any): Array<string> {
    var saleArray: Array<string> = [];
    $.ajax({
        type: "GET",
        url: webApiUri + '/Sala/GetAllSaleByEdificio/' + id,
        contentType: 'application/json',
    }).done(function (sale) {
        $.each(sale, (key, item: Sala) => {
            saleArray.push(item.Nome);
        })
        console.log(saleArray);
        populateSale(saleArray);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
    return saleArray;
}

export function getAllEdifici() {
    $.getJSON(webApiUri + '/Edificio/GetAllEdifici')
        .done((edifici: Edificio[]) => {
            console.log(edifici);
            populateEdifici(edifici);
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
    let p = {
        Cognome: $("#cognome").val(),
        Nome: $("#nome").val(),
    };

    $.ajax({
        type: "POST",
        url: webApiUri + '/User/PostUser',
        contentType: 'application/json',
        data: JSON.stringify(p),
    }).done(function (data) {
        alert("Hai inserito correttamente la nuova risorsa " + p.Nome + " " + p.Cognome);
        location.reload();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while creating UserTitle");
    });
}
export function aggiornaRisorsa(id: number): void {
    $.ajax({
        type: "PUT",
        url: webApiUri + '/User/UpdateUserFlag?id=' + id,
        contentType: 'application/json',
    }).done(function () {
        alert("Hai abilitato l'utente alla prenotazione!");
        location.reload();
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
    var p = { Nome: "Edificio 3", Indirizzo: "via verdi 465", Stato: "Disponibile" };
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

// export function doPrenotazione(): void {
//     $.ajax({
//         type: "POST",
//         url: webApiUri + '/Prenotazione/PostPrenotazione',
//         contentType: 'application/json',
//         data: JSON.stringify({
//             ID_Risorsa: $("#selectUsername").find(":selected").val(),
//             ID_Sala: $("#selectSala").find(":selected").val(),
//             Descrizione: $("#descrizione").val(),
//             DataInizioPrenotazione: $("#bookDate").val()
//         })
//     }).done(function (data) {
//         console.log(JSON.stringify(data));
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         alert("An error occurred while creating UserTitle");
//     });
// }