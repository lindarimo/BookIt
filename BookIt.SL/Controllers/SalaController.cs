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
    public class SalaController : ApiController
    {
        [HttpGet]
        [Route("api/Sala/GetAllSale")]

        public IEnumerable<SalaVM> GetAllSale()
        {
            SalaManager mng = new SalaManager();
            List<Sala> sale = mng.GetAllSale().ToList();
            List<SalaVM> result = new List<SalaVM>();
            for (int i = 0; i < sale.Count(); i++)
            {
                result.Add(new SalaVM() { ID_Sala = sale[i].ID_Sala, ID_Edificio = sale[i].ID_Edificio, Nome = sale[i].Nome, NumeroPostiDisponibili = sale[i].NumeroPostiDisponibili, Stato = sale[i].Stato });
            }
            return result;
        }

        [HttpGet]
        [Route("api/Sala/GetAllSaleByEdificio/{id}")]

        public IEnumerable<SalaVM> GetAllSaleByEdificio([FromUri]int id)
        {
            SalaManager mng = new SalaManager();
            List<Sala> sale = mng.GetAllSaleByEdificio(id).ToList();
            List<SalaVM> result = new List<SalaVM>();
            for (int i = 0; i < sale.Count(); i++)
            {
                result.Add(new SalaVM() { ID_Sala = sale[i].ID_Sala, ID_Edificio = sale[i].ID_Edificio, Nome = sale[i].Nome, NumeroPostiDisponibili = sale[i].NumeroPostiDisponibili, Stato = sale[i].Stato });
            }
            return result;
        }

        [HttpPost]
        [Route("api/Sala/PostSala")]
        public IHttpActionResult PostSala(SalaVM sala)
        {
            SalaManager mng = new SalaManager();
            Sala nuovaSala = new Sala() { ID_Sala = sala.ID_Sala, ID_Edificio = sala.ID_Edificio, Nome = sala.Nome, NumeroPostiDisponibili = sala.NumeroPostiDisponibili, Stato = sala.Stato };
            mng.CreateSala(nuovaSala);
            return Ok(sala);
        }
    }
}
