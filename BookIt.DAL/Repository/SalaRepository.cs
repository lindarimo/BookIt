using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.DAL.Repository
{
    public class SalaRepository : EFRepository<Sala>
    {
        public IEnumerable<Sala> GetAll()
        {
            return ((BookItEntities)Context).Sala.ToList();
        }
        public Sala GetById(int id)
        {
            return ((BookItEntities)Context).Sala.SingleOrDefault(i => i.ID_Sala == id);
        }

        // Shadowed by base class
        public Sala Add(Sala item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Sala.Add(item);
            return item;
        }

        public void Delete(Sala item)
        {
            ((BookItEntities)Context).Sala.Remove(item);
        }

    }
}
