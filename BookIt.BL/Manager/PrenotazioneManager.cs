using BookIt.Common;
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
        public IEnumerable<Prenotazione> GetAllPrenotazioni()
        {
            DAL.Repository.PrenotazioneRepository PrenotazioneRepository = new DAL.Repository.PrenotazioneRepository();
            IEnumerable<Prenotazione> result;
            try
            {
                DAL.Repository.PrenotazioneRepository repo = new DAL.Repository.PrenotazioneRepository();
                result = repo.GetAll();
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }

            return result;
        }
        public Prenotazione GetPrenotazioneById(int id)
        {
            Prenotazione result;
            try
            {
                DAL.Repository.PrenotazioneRepository repo = new DAL.Repository.PrenotazioneRepository();
                result = repo.GetById(id);
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
            return result;
        }
        public bool CreatePrenotazione(Prenotazione prenotazione)
        {
            DAL.Repository.PrenotazioneRepository repo = null;
            Prenotazione result = null;
            int count = 0;

            try
            {
                repo = new DAL.Repository.PrenotazioneRepository();
                // Controllo se le date inserite dall'utente sono compatibili con la prenotazione. Non è possibile inserire una prenotazione che si 
                // sovrapponga con le date di un'altra prenotazione per la stessa sala.
                count = repo.Find(x => x.ID_Sala == prenotazione.ID_Sala &&
                                    ((prenotazione.DataInizioPrenotazione >= x.DataInizioPrenotazione && prenotazione.DataInizioPrenotazione <= x.DataFinePrenotazione) ||
                                    (prenotazione.DataFinePrenotazione >= x.DataInizioPrenotazione && prenotazione.DataFinePrenotazione <= x.DataFinePrenotazione))).Count();

                if (count == 0)
                {
                    result = repo.Add(prenotazione);
                    DAL.GlobalUnitOfWork.Commit();
                    return true;
                }
            }
            catch (Exception ex)
            {
                LogManager.Error(ex);
                throw ex;
            }
            return false;
        }
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
                LogManager.Error(ex);
                throw ex;
            }
        }
    }
}
