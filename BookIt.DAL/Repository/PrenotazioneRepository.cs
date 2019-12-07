using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.DAL.Repository
{
    public class PrenotazioneRepository : EFRepository<Prenotazione>
    {
        public IEnumerable<Prenotazione> GetAll()
        {
            return ((BookItEntities)Context).Prenotaziones.ToList();
        }
        public Prenotazione GetById(int id)
        {
            return ((BookItEntities)Context).Prenotaziones.SingleOrDefault(i => i.ID_Prenotazione == id);
        }

        // Shadowed by base class
        public Prenotazione Add(Prenotazione item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Prenotaziones.Add(item);
            return item;
        }

        public void Delete(Prenotazione item)
        {
            ((BookItEntities)Context).Prenotaziones.Remove(item);
        }

    }
}
