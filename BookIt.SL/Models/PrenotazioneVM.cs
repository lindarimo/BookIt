using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookIt.SL.Models
{
    public class PrenotazioneVM
    {
        public int ID_Prenotazione { get; set; }
        public int ID_Risorsa { get; set; }
        public int ID_Sala { get; set; }
        public string Descrizione { get; set; }
        public DateTime DataInizioPrenotazione { get; set; }
        public DateTime DataFinePrenotazione { get; set; }
    }
}