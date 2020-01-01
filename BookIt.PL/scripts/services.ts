import { Risorsa, Edificio, Sala, Prenotazione } from "./model";
export class Services {
    public static webApiUri: string = 'http://localhost:60398/api';

    /**
     * getAllUsersCanBook
     */
    public static getAllUsersCanBook(): JQuery.jqXHR<Risorsa[]> {
        return $.getJSON(this.webApiUri + '/User/GetAllUsersCanBook')
    };

    /**
    * getAllUsers
    */
    public static getAllUsers(): JQuery.jqXHR<Risorsa[]> {
        return $.getJSON(this.webApiUri + '/User/GetAllUsers');
    };
    
    /**
    * updateUser
    */
    public static updateUser(id: number): void {
        $.ajax({
            type: "PUT",
            url: this.webApiUri + '/User/UpdateUserFlag?id=' + id,
            contentType: 'application/json',
        }).done(function () {
            alert("Hai abilitato l'utente alla prenotazione!");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    };

    /**
    * createUser
    */
    public static createUser(risorsa: any): void {
        $.ajax({
            type: "POST",
            url: this.webApiUri + '/User/PostUser',
            contentType: 'application/json',
            data: JSON.stringify(risorsa),
        }).done(function (data) {
            alert("Hai inserito correttamente la nuova risorsa " + data.Nome + " " + data.Cognome);
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    };

    /**
    * getAllRooms
    */
    public static getAllRooms(): JQuery.jqXHR<Sala[]> {
        return $.getJSON(this.webApiUri + '/Sala/GetAllSale');
    };

    /**
    * createRoom
    */
    public static createRoom(sala: any): void {
        $.ajax({
            type: "POST",
            url: this.webApiUri + '/Sala/PostSala',
            contentType: 'application/json',
            data: JSON.stringify(sala),
        }).done(function (data) {
            alert("Sala inserita correttamente!");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    };

    /**
    * getAllRoomsByBuilding
    */
    public static getAllRoomsByBuilding(id: any): JQuery.jqXHR<Sala[]> {
        return $.getJSON(this.webApiUri + '/Sala/GetAllSaleByEdificio/' + id);
    };

    /**
    * getAllBuildings
    */
    public static getAllBuildings(): JQuery.jqXHR<Edificio[]> {
        return $.getJSON(this.webApiUri + '/Edificio/GetAllEdifici')
    };

    /**
    * createBuilding
    */
    public static createBuilding(edificio: any): void {
        $.ajax({
            type: "POST",
            url: this.webApiUri + '/Edificio/PostEdificio',
            contentType: 'application/json',
            data: JSON.stringify(edificio),
        }).done(function (data) {
            alert("Hai inserito correttamente il nuovo edificio " + data.Nome);
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    };

    /**
    * getAllReservations
    */
    public static getAllReservations(): JQuery.jqXHR<Prenotazione[]> {
        return $.getJSON(this.webApiUri + '/Prenotazione/GetAllPrenotazioni');
    };

    /**
    * deleteReservation
    */
    public static deleteReservation(id: number): void {
        $.ajax({
            type: "DELETE",
            url: this.webApiUri + '/Prenotazione/DeletePrenotazione/?id=' + id,
            contentType: 'application/json',
        }).done(function (data) {
            console.log(JSON.stringify(data));
            alert("Hai eliminato la prenotazione!");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        });
    };

    /**
    * createReservation
    */
    public static createReservation(prenotazione: any) {
        $.ajax({
            type: "POST",
            url: this.webApiUri + '/Prenotazione/PostPrenotazione',
            contentType: 'application/json',
            data: JSON.stringify(prenotazione)
        }).done(function (data) {
            data !== null ? alert("Prenotazione inserita correttamente!") : alert("Impossibile inserire la prenotazione. Data e ora non disponibili per la sala selezionata. Riprova con altri parametri.");
            location.reload();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred while creating UserTitle");
        })
    };
}
