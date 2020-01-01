define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Services {
        /**
         * getAllUsersCanBook
         */
        static getAllUsersCanBook() {
            return $.getJSON(this.webApiUri + '/User/GetAllUsersCanBook');
        }
        ;
        /**
        * getAllUsers
        */
        static getAllUsers() {
            return $.getJSON(this.webApiUri + '/User/GetAllUsers');
        }
        ;
        /**
        * updateUser
        */
        static updateUser(id) {
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
        }
        ;
        /**
        * createUser
        */
        static createUser(risorsa) {
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
        }
        ;
        /**
        * getAllRooms
        */
        static getAllRooms() {
            return $.getJSON(this.webApiUri + '/Sala/GetAllSale');
        }
        ;
        /**
        * createRoom
        */
        static createRoom(sala) {
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
        }
        ;
        /**
        * getAllRoomsByBuilding
        */
        static getAllRoomsByBuilding(id) {
            return $.getJSON(this.webApiUri + '/Sala/GetAllSaleByEdificio/' + id);
        }
        ;
        /**
        * getAllBuildings
        */
        static getAllBuildings() {
            return $.getJSON(this.webApiUri + '/Edificio/GetAllEdifici');
        }
        ;
        /**
        * createBuilding
        */
        static createBuilding(edificio) {
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
        }
        ;
        /**
        * getAllReservations
        */
        static getAllReservations() {
            return $.getJSON(this.webApiUri + '/Prenotazione/GetAllPrenotazioni');
        }
        ;
        /**
        * deleteReservation
        */
        static deleteReservation(id) {
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
        }
        ;
        /**
        * createReservation
        */
        static createReservation(prenotazione) {
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
            });
        }
        ;
    }
    exports.Services = Services;
    Services.webApiUri = 'http://localhost:60398/api';
});
