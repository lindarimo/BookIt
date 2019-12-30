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
        /// <summary>
        /// Returns a list of User entities.
        /// </summary>
        /// <returns>A list of User entities</returns>
        public IEnumerable<Sala> GetAllSale()
        {
            DAL.Repository.SalaRepository SalaRepository = new DAL.Repository.SalaRepository();
            DAL.Repository.SalaRepository repo = null;
            IEnumerable<Sala> result = null;

            try
            {
                repo = new DAL.Repository.SalaRepository();
                result = repo.GetAll();
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }

            return result;
        }
        public IEnumerable<Sala> GetAllSaleByEdificio(int id)
        {
            DAL.Repository.SalaRepository SalaRepository = new DAL.Repository.SalaRepository();
            DAL.Repository.SalaRepository repo = null;
            IEnumerable<Sala> result = null;

            try
            {
                repo = new DAL.Repository.SalaRepository();
                result = repo.GetByEdificio(id);
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }

            return result;
        }
        /// <summary>
        /// Returns the User entity with the given identifier.
        /// </summary>
        /// <param name="id">The User identifier</param>
        /// <returns>The User entity</returns>
        public Sala GetSalaById(int id)
        {
            DAL.Repository.SalaRepository repo = null;
            Sala result = null;

            try
            {
                repo = new DAL.Repository.SalaRepository();
                result = repo.GetById(id);
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }

            return result;
        }

        /// <summary>
        /// Creates the given User.
        /// </summary>
        /// <param name="user">The User entity to create</param>
        public void CreateSala(Sala sala)
        {
            DAL.Repository.SalaRepository repo = null;
            Sala result = null;

            try
            {
                sala.Stato = "Prenotabile";
                repo = new DAL.Repository.SalaRepository();
                result = repo.Add(sala);
                DAL.GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }
        }

        /// <summary>
        /// Updates the given User.
        /// </summary>
        /// <param name="id">User identifier</param>
        /// <param name="user">User entity to update</param>
        /*public void UpdateUser(int id, Risorsa risorsa)
        {
            DAL.Repository.RisorsaRepository repo = null;

            try
            {
                repo = new DAL.Repository.RisorsaRepository();
                Risorsa actual = repo.GetById(id);
                actual.Nome = risorsa.Nome;
                repo.Update(actual);
                DAL.GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }
        }*/

        /// <summary>
        /// Deletes the User with the given identifier.
        /// </summary>
        /// <param name="id">The User identifier</param>
        /*public void DeleteUser(int id)
        {
            DAL.Repository.RisorsaRepository repo = null;

            try
            {
                repo = new DAL.Repository.RisorsaRepository();
                Risorsa userToDelete = this.GetUserById(id);
                repo.Delete(userToDelete);
                DAL.GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }
        }*/
    }
}
