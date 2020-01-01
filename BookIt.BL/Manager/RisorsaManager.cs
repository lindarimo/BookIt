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
    public class RisorsaManager
    {
        public IEnumerable<Risorsa> GetAllUsers()
        {
            RisorsaRepository RisorsaRepository = new RisorsaRepository();
            IEnumerable<Risorsa> result;
            try
            {
                RisorsaRepository repo = new RisorsaRepository();
                result = repo.GetAll();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }

            return result;
        }
        public IEnumerable<Risorsa> GetAllUsersCanBook()
        {
            RisorsaRepository RisorsaRepository = new RisorsaRepository();
            RisorsaRepository repo = null;
            IEnumerable<Risorsa> result = null;
            try
            {
                // Se un utente ha il flagPrenotazione uguale a true, allora è abilitato alla prenotazione di sale
                repo = new RisorsaRepository();
                result = repo.Find(x => x.FlagPrenotazione == true).ToArray();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
            return result;
        }
        public Risorsa GetUserById(int id)
        {
            DAL.Repository.RisorsaRepository repo = null;
            Risorsa result = null;

            try
            {
                repo = new RisorsaRepository();
                result = repo.GetById(id);
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }

            return result;
        }

        public void CreateUser(Risorsa user)
        {
            RisorsaRepository repo = null;
            Risorsa result = null;
            int count;
            int countEmail;

            try
            {
                repo = new RisorsaRepository();

                //Creazione username. Prendo i primi 5 caratteri del cognome, i primi 2 caratteri del nome.
                string usernameString = $"{user.Cognome.Substring(0, 5)}{user.Nome.Substring(0, 2)}".ToLower();
                //Cerco se esistono già username uguali nel database
                count = repo.Find(x => x.Username.Substring(0, 7) == usernameString).Count();
                user.Username = $"{usernameString}{++count}";

                //Creazione email. Creo una stringa formata da nome.cognome@reti.it
                string emailString = $"{user.Nome}.{user.Cognome}@reti.it".ToLower();
                countEmail = repo.Find(x => x.Email == emailString).Count();
                if (countEmail == 0)
                {
                    user.Email = emailString;
                }
                else
                {
                    user.Email = $"{user.Nome}.{user.Cognome}{countEmail}@reti.it".ToLower();
                };
                
                //id
                user.ID = 1;

                //flagPrenotazione sempre a false
                user.FlagPrenotazione = false;

                result = repo.Add(user);
                DAL.GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
        }

        public void UpdateUser(int id)
        {
            try
            {
                RisorsaRepository repo = new RisorsaRepository();
                Risorsa actual = repo.GetById(id);
                // imposto il flagPrenotazione a true
                actual.FlagPrenotazione = true;
                repo.Update(actual);
                GlobalUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
        }
    }
}
