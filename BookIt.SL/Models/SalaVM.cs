using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookIt.SL.Models
{
    public class SalaVM
    {
        public int ID_Sala { get; set; }
        public int ID_Edificio { get; set; }
        public string Nome { get; set; }
        public int NumeroPostiDisponibili { get; set; }
        public string Stato { get; set; }

    }
}