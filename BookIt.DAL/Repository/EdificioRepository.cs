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
        public Edificio Add(Edificio item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Edificios.Add(item);
            return item;
        }
    }
}
