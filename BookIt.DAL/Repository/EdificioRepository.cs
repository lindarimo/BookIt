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
            return ((BookItEntities)Context).Edificios.ToList();
        }
        public Edificio GetById(int id)
        {
            return ((BookItEntities)Context).Edificios.SingleOrDefault(i => i.ID_Edificio == id);
        }

        public Edificio GetByName(string name)
        {
            return ((BookItEntities)Context).Edificios.SingleOrDefault(i => i.Nome == name);
        }

        // Shadowed by base class
        public Edificio Add(Edificio item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Edificios.Add(item);
            return item;
        }

        public void Delete(Edificio item)
        {
            ((BookItEntities)Context).Edificios.Remove(item);
        }

    }
}
