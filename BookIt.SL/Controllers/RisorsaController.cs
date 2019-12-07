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
    public class RisorsaController : ApiController
    {
        [HttpGet]
        [Route("api/User/GetAllUsers")]

        public IEnumerable<RisorsaVM> GetAllUsers()
        {
            RisorsaManager mng = new RisorsaManager();
            List<Risorsa> risorse = mng.GetAllUsers().ToList();
            // TODO: use Mappers!
            List<RisorsaVM> result = new List<RisorsaVM>();
            for (int i = 0; i < risorse.Count(); i++)
            {
                result.Add(new RisorsaVM() { ID = risorse[i].ID, Cognome = risorse[i].Cognome, Nome = risorse[i].Nome, Username = risorse[i].Username, Email = risorse[i].Email, FlagPrenotazione = risorse[i].FlagPrenotazione });
            }
            return result;
        }

        [HttpGet]
        [Route("api/User/GetUser")]
        public IHttpActionResult GetUser(int id)
        {
            RisorsaManager mng = new RisorsaManager();
            Risorsa risorsa = mng.GetUserById(id);
            if (risorsa == null)
            {
                return NotFound();
            }
            // TODO: use Mappers!
            return Ok(new RisorsaVM() { ID = risorsa.ID, Cognome = risorsa.Cognome, Nome = risorsa.Nome, Username = risorsa.Username, Email = risorsa.Email, FlagPrenotazione = risorsa.FlagPrenotazione });
        }

        [HttpPost]
        public IHttpActionResult PostUser(RisorsaVM risorsa)
        {
            RisorsaManager mng = new RisorsaManager();
            // TODO: use Mappers!
            Risorsa nuovaRisorsa = new Risorsa() { ID = risorsa.ID, Cognome = risorsa.Cognome, Nome = risorsa.Nome, Username = risorsa.Username, Email = risorsa.Email, FlagPrenotazione = risorsa.FlagPrenotazione };
            mng.CreateUser(nuovaRisorsa);
            return Ok(risorsa);
        }

        /*[HttpPut]
        public IHttpActionResult PutUser(int id, [FromBody] UserVM item)
        {
            UsersManager mng = new UsersManager();
            // TODO: use Mappers!
            User user = new User() { Id = item.Id, UserTitleId = item.UserTitleId, Username = item.Username, Surname = item.Surname, Name = item.Name };
            mng.UpdateUser(id, user);

            return Ok(id);
        }*/

        [HttpDelete]
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
        }
    }
}
