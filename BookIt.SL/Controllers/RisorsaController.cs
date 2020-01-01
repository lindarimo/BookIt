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
            List<RisorsaVM> result = new List<RisorsaVM>();
            for (int i = 0; i < risorse.Count(); i++)
            {
                result.Add(new RisorsaVM() { ID = risorse[i].ID, Cognome = risorse[i].Cognome, Nome = risorse[i].Nome, Username = risorse[i].Username, Email = risorse[i].Email, FlagPrenotazione = risorse[i].FlagPrenotazione });
            }
            return result;
        }

        [HttpGet]
        [Route("api/User/GetAllUsersCanBook")]

        public IEnumerable<RisorsaVM> GetAllUsersCanBook()
        {
            RisorsaManager mng = new RisorsaManager();
            List<Risorsa> risorse = mng.GetAllUsersCanBook().ToList();
            List<RisorsaVM> result = new List<RisorsaVM>();
            for (int i = 0; i < risorse.Count(); i++)
            {
                result.Add(new RisorsaVM() { ID = risorse[i].ID, Cognome = risorse[i].Cognome, Nome = risorse[i].Nome, Username = risorse[i].Username, Email = risorse[i].Email, FlagPrenotazione = risorse[i].FlagPrenotazione });
            }
            return result;
        }

        [HttpPost]
        [Route("api/User/PostUser")]

        public IHttpActionResult PostUser(RisorsaVM risorsa)
        {
            RisorsaManager mng = new RisorsaManager();
            Risorsa nuovaRisorsa = new Risorsa() { ID = risorsa.ID, Cognome = risorsa.Cognome, Nome = risorsa.Nome, Username = risorsa.Username, Email = risorsa.Email, FlagPrenotazione = risorsa.FlagPrenotazione };
            mng.CreateUser(nuovaRisorsa);
            return Ok(risorsa);
        }

        [HttpPut]
        [Route("api/User/UpdateUserFlag")]

        public IHttpActionResult UpdateUserFlag([FromUri] int id)
        {
            RisorsaManager mng = new RisorsaManager();
            mng.UpdateUser(id);
            return Ok();
        }
    }
}
