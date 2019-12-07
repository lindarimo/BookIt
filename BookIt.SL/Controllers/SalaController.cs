﻿using BookIt.BL.Manager;
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
        [Route("api/User/GetAllSale")]

        public IEnumerable<SalaVM> GetAllSale()
        {
            SalaManager mng = new SalaManager();
            List<Sala> sale = mng.GetAllSale().ToList();
            // TODO: use Mappers!
            List<SalaVM> result = new List<SalaVM>();
            for (int i = 0; i < sale.Count(); i++)
            {
                result.Add(new SalaVM() { ID_Sala = sale[i].ID_Sala, ID_Edificio = sale[i].ID_Edificio, Nome = sale[i].Nome, NumeroPostiDisponibili = sale[i].NumeroPostiDisponibili, Stato = sale[i].Stato });
            }
            return result;
        }

        [HttpGet]
        [Route("api/User/GetSala")]
        public IHttpActionResult GetSala(int id)
        {
            SalaManager mng = new SalaManager();
            Sala sala = mng.GetSalaById(id);
            if (sala == null)
            {
                return NotFound();
            }
            // TODO: use Mappers!
            return Ok(new SalaVM() { ID_Sala = sala.ID_Sala, ID_Edificio = sala.ID_Edificio, Nome = sala.Nome, NumeroPostiDisponibili = sala.NumeroPostiDisponibili, Stato = sala.Stato });
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