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
            List<EdificioVM> result = new List<EdificioVM>();
            for (int i = 0; i < risorse.Count(); i++)
            {
                result.Add(new EdificioVM() { ID_Edificio = risorse[i].ID_Edificio, Nome = risorse[i].Nome, Indirizzo = risorse[i].Indirizzo, Stato = risorse[i].Stato });
            }
            return result;
        }

        [HttpPost]
        [Route("api/Edificio/PostEdificio")]
        public IHttpActionResult PostEdificio(EdificioVM edificio)
        {
            EdificioManager mng = new EdificioManager();
            Edificio nuovoEdificio = new Edificio() { ID_Edificio = edificio.ID_Edificio, Nome = edificio.Nome, Indirizzo = edificio.Indirizzo, Stato = edificio.Stato };
            mng.CreateEdificio(nuovoEdificio);

            return Ok(edificio);
        }
    }
}
