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
            return ((BookItEntities)Context).Prenotazione.ToList();
        }
        public Sala GetById(int id)
        {
            return ((BookItEntities)Context).Prenotazione.SingleOrDefault(i => i.ID_Prenotazione == id);
        }

        // Shadowed by base class
        public Sala Add(Prenotazione item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Prenotazione.Add(item);
            return item;
        }

        public void Delete(Sala item)
        {
            ((BookItEntities)Context).Prenotazione.Remove(item);
        }

    }
}
