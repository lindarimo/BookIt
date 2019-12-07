using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.DAL.Repository
{
    public class EdificioRepository : EFRepository<Edificio>
    {
        public IEnumerable<Edificio> GetAll()
        {
            return ((BookItEntities)Context).Edificio.ToList();
        }
        public Edificio GetById(int id)
        {
            return ((BookItEntities)Context).Edificio.SingleOrDefault(i => i.ID_Edificio == id);
        }

        // Shadowed by base class
        public Edificio Add(Edificio item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Edificio.Add(item);
            return item;
        }

        public void Delete(Edificio item)
        {
            ((BookItEntities)Context).Edificio.Remove(item);
        }

    }
}
