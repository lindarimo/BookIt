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
    
    public partial class Edificio
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Edificio()
        {
            this.Salas = new HashSet<Sala>();
        }
    
        public int ID_Edificio { get; set; }
        public string Nome { get; set; }
        public string Indirizzo { get; set; }
        public string Stato { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sala> Salas { get; set; }
    }
}
