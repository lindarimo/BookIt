//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BookIt.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Prenotazione
    {
        public int ID_Prenotazione { get; set; }
        public int ID_Risorsa { get; set; }
        public int ID_Sala { get; set; }
        public string Descrizione { get; set; }
        public System.DateTime DataInizioPrenotazione { get; set; }
        public System.DateTime DataFinePrenotazione { get; set; }
    
        public virtual Risorsa Risorsa { get; set; }
        public virtual Sala Sala { get; set; }
    }
}