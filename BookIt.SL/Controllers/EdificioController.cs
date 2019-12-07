using BookIt.BL.Manager;
using BookIt.DAL;
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
    public class EdificioController : ApiController
    {
        [HttpGet]
        [Route("api/Edificio/GetAllEdifici")]

        public IEnumerable<EdificioVM> GetAllEdifici()
        {
            EdificioManager mng = new EdificioManager();
            List<Edificio> risorse = mng.GetAllEdifici().ToList();
            // TODO: use Mappers!
            List<EdificioVM> result = new List<EdificioVM>();
            for (int i = 0; i < risorse.Count(); i++)
            {
                result.Add(new EdificioVM() { ID_Edificio = risorse[i].ID_Edificio, Nome = risorse[i].Nome, Indirizzo = risorse[i].Indirizzo, Stato = risorse[i].Stato });
            }
            return result;
        }

        [HttpGet]
        [Route("api/Edificio/GetEdificio")]
        public IHttpActionResult GetEdificio(int id)
        {
            EdificioManager mng = new EdificioManager();
            Edificio edificio = mng.GetEdificioById(id);
            if (edificio == null)
            {
                return NotFound();
            }
            // TODO: use Mappers!
            return Ok(new EdificioVM() { ID_Edificio = edificio.ID_Edificio, Nome = edificio.Nome, Indirizzo = edificio.Indirizzo, Stato = edificio.Stato });
        }

        /*[HttpPost]
        public IHttpActionResult PostUser(RisorsaVM risorsa)
        {
            RisorsaManager mng = new RisorsaManager();
            // TODO: use Mappers!
            Risorsa nuovaRisorsa = new Risorsa() { ID = risorsa.ID, Cognome = risorsa.Cognome, Nome = risorsa.Nome, Username = risorsa.Username, Email = risorsa.Email, FlagPrenotazione = risorsa.FlagPrenotazione };
            mng.CreateUser(nuovaRisorsa);
            return Ok(risorsa);
        }*/

        /*[HttpPut]
        public IHttpActionResult PutUser(int id, [FromBody] UserVM item)
        {
            UsersManager mng = new UsersManager();
            // TODO: use Mappers!
            User user = new User() { Id = item.Id, UserTitleId = item.UserTitleId, Username = item.Username, Surname = item.Surname, Name = item.Name };
            mng.UpdateUser(id, user);

            return Ok(id);
        }*/

        /*[HttpDelete]
        public IHttpActionResult DeleteRisorsa([FromUri] int id)
        {
            try
            {
                RisorsaManager mng = new RisorsaManager();
                mng.DeleteUser(id);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }*/
    }
}
