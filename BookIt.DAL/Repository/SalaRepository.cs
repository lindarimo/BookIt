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
            return ((BookItEntities)Context).Salas.ToList();
        }
        public Sala GetById(int id)
        {
            return ((BookItEntities)Context).Salas.SingleOrDefault(i => i.ID_Sala == id);
        }
        public IEnumerable<Sala> GetByEdificio(int id)
        {
            return ((BookItEntities)Context).Salas.Where(i => i.ID_Edificio == id).ToList();
        }
        public Sala Add(Sala item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            ((BookItEntities)Context).Salas.Add(item);
            return item;
        }
    }
}
