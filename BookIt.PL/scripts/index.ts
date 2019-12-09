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
