﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookIt.SL.Models
{
    public class RisorsaVM
    {
        public int ID { get; set; }
        public string Cognome { get; set; }
        public string Nome { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool FlagPrenotazione { get; set; }
    }
}