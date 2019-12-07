using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.DAL.Repository
{
    public class RisorsaRepository : EFRepository<Risorsa>
    {
        public IEnumerable<Risorsa> GetAll()
        {
            return ((BookItEntities)Context).Risorsa.ToList();
        }
        public Risorsa GetById(int id)
        {
            return ((BookItEntities)Context).Risorsa.SingleOrDefault(i => i.ID == id);
        }

        // Shadowed by base class
        public Risorsa Add(Risorsa item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Risorsa.Add(item);
            return item;
        }

        public void Delete(Risorsa item)
        {
            ((BookItEntities)Context).Risorsa.Remove(item);
        }
    
    }
}
