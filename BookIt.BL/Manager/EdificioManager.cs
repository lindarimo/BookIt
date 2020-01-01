using BookIt.Common;
using BookIt.DAL;
using BookIt.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.BL.Manager
{
    public class EdificioManager
    {
        public IEnumerable<Edificio> GetAllEdifici()
        {
            EdificioRepository EdificioRepository = new EdificioRepository();
            IEnumerable<Edificio> result;
            try
            {
                EdificioRepository repo = new EdificioRepository();
                result = repo.GetAll();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
            return result;
        }
        public void CreateEdificio(Edificio edificio)
        {
            try
            {
                EdificioRepository repo = new DAL.Repository.EdificioRepository();
                Edificio result = repo.Add(edificio);
                DAL.GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
        }
    }
}
