using BookIt.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.BL.Manager
{
    public class PrenotazioneManager
    {
        /// <summary>
        /// Returns a list of User entities.
        /// </summary>
        /// <returns>A list of User entities</returns>
        public IEnumerable<Prenotazione> GetAllPrenotazioni()
        {
            DAL.Repository.PrenotazioneRepository PrenotazioneRepository = new DAL.Repository.PrenotazioneRepository();
            DAL.Repository.PrenotazioneRepository repo = null;
            IEnumerable<Prenotazione> result = null;

            try
            {
                repo = new DAL.Repository.PrenotazioneRepository();
                result = repo.GetAll();
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
        public Prenotazione GetPrenotazioneById(int id)
        {
            DAL.Repository.PrenotazioneRepository repo = null;
            Prenotazione result = null;

            try
            {
                repo = new DAL.Repository.PrenotazioneRepository();
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
        /*public void CreateUser(Risorsa user)
        {
            DAL.Repository.RisorsaRepository repo = null;
            Risorsa result = null;

            try
            {
                repo = new DAL.Repository.RisorsaRepository();
                result = repo.Add(user);
                DAL.GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }
        }*/

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
        public void DeletePrenotazione(int id)
        {
            DAL.Repository.PrenotazioneRepository repo = null;

            try
            {
                repo = new DAL.Repository.PrenotazioneRepository();
                Prenotazione prenotazioneToDelete = this.GetPrenotazioneById(id);
                repo.Delete(prenotazioneToDelete);
                DAL.GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                ///LogManager.Error(ex);
                throw ex;
            }
        }
    }
}
