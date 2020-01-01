using BookIt.BL.Manager;
using BookIt.DAL;
using BookIt.SL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BookIt.SL.Controllers
{
    [EnableCors(origins: "http://localhost:56458", headers: "*", methods: "*")]
    public class PrenotazioneController : ApiController
    {
        [HttpGet]
        [Route("api/Prenotazione/GetAllPrenotazioni")]

        public IEnumerable<PrenotazioneVM> GetAllPrenotazioni()
        {
            PrenotazioneManager mng = new PrenotazioneManager();
            List<Prenotazione> prenotazioni = mng.GetAllPrenotazioni().ToList();
            List<PrenotazioneVM> result = new List<PrenotazioneVM>();
            for (int i = 0; i < prenotazioni.Count(); i++)
            {
                result.Add(new PrenotazioneVM() { ID_Prenotazione = prenotazioni[i].ID_Prenotazione, ID_Risorsa = prenotazioni[i].ID_Risorsa, ID_Sala = prenotazioni[i].ID_Sala, Descrizione = prenotazioni[i].Descrizione, DataInizioPrenotazione = prenotazioni[i].DataInizioPrenotazione, DataFinePrenotazione = prenotazioni[i].DataFinePrenotazione });
            }
            return result;
        }

        [HttpPost]
        [Route("api/Prenotazione/PostPrenotazione")]
        public IHttpActionResult PostPrenotazione(PrenotazioneVM prenotazione)
        {
            PrenotazioneManager mng = new PrenotazioneManager();
            Prenotazione nuovaPrenotazione = new Prenotazione() { ID_Prenotazione = prenotazione.ID_Prenotazione, ID_Risorsa = prenotazione.ID_Risorsa, ID_Sala = prenotazione.ID_Sala, Descrizione = prenotazione.Descrizione, DataInizioPrenotazione = prenotazione.DataInizioPrenotazione, DataFinePrenotazione = prenotazione.DataFinePrenotazione };
            var result = mng.CreatePrenotazione(nuovaPrenotazione);

            return result ? Ok(nuovaPrenotazione) : Ok<Prenotazione>(null);
        }

        [HttpDelete]
        [Route("api/Prenotazione/DeletePrenotazione")]
        public IHttpActionResult DeletePrenotazione([FromUri] int id)
        {
            try
            {
                PrenotazioneManager mng = new PrenotazioneManager();
                mng.DeletePrenotazione(id);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
