using BookIt.Common;
using BookIt.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.BL.Manager
{
    public class SalaManager
    {
        public IEnumerable<Sala> GetAllSale()
        {
            DAL.Repository.SalaRepository SalaRepository = new DAL.Repository.SalaRepository();
            IEnumerable<Sala> result;
            try
            {
                DAL.Repository.SalaRepository repo = new DAL.Repository.SalaRepository();
                result = repo.GetAll();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }

            return result;
        }
        public IEnumerable<Sala> GetAllSaleByEdificio(int id)
        {
            DAL.Repository.SalaRepository SalaRepository = new DAL.Repository.SalaRepository();
            IEnumerable<Sala> result;
            try
            {
                DAL.Repository.SalaRepository repo = new DAL.Repository.SalaRepository();
                result = repo.GetByEdificio(id);
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
            return result;
        }
        public void CreateSala(Sala sala)
        {
            try
            {
                DAL.Repository.SalaRepository repo = new DAL.Repository.SalaRepository();
                Sala result = repo.Add(sala);
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
