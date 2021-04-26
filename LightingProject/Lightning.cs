using LightingProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
//using WebApi.Helpers;

#nullable disable

namespace LightingProject
{
    
    public partial class Form
    {
        public DateTime? Initial { get; set; }
        public DateTime? End { get; set; }
    }
    public class LightningService
    {
        private readonly lightningsContext DbContext;

        public LightningService(lightningsContext DbContext)
        {
            this.DbContext = DbContext;
        }
        //Flash Search
        #region

        public async Task<List<Flash>> GetLightning(DateTime initial, DateTime final, int[] peak, int type)
        {
            if(type ==2 )
                return await DbContext.Flashes.Where(t => t.Ltype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && peak[0] <= t.Peakcurrent && t.Peakcurrent <= peak[1] && t.Ltype <= type)
                 .Select(
                 s => new Flash
                 {
                     Id = s.Id,
                     IdDateNavigation = s.IdDateNavigation,
                     Ltype = s.Ltype,
                     Latitude = s.Latitude,
                     Longitude = s.Longitude,
                     Peakcurrent = s.Peakcurrent,
                     Icheight = s.Icheight,
                     Sensor = s.Sensor,
                     Icmulti = s.Icmulti,
                     Cgmulti = s.Cgmulti,
                 }
             ).ToListAsync();
            else
            return await DbContext.Flashes.Where(t => t.Ltype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && peak[0] <= t.Peakcurrent && t.Peakcurrent <= peak[1] && t.Ltype == type)
                .Select(
                s => new Flash
                {
                    Id = s.Id,
                    IdDateNavigation = s.IdDateNavigation,
                    Ltype = s.Ltype,
                    Latitude = s.Latitude,
                    Longitude = s.Longitude,
                    Peakcurrent = s.Peakcurrent,
                    Icheight = s.Icheight,
                    Sensor = s.Sensor,
                    Icmulti = s.Icmulti,
                    Cgmulti = s.Cgmulti,
                }
            ).ToListAsync();
        }
        public async Task<List<Flash>> GetLightning(DateTime initial, DateTime final, int type)
        {

            //List<Flash> list_dates_id = await DbContext.Dates.Where(  t =>  initial <= t.Date1 && t.Date1 <= final).Select(s =>
            //new Date
            //{
            //    id = s.id,
            //    Ltime = s.Ltime,
            //}).ToListAsync();
            //return null;
            if(type ==2)
                return await DbContext.Flashes.Where(t => t.Ltype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && t.Ltype <= type)
                            .Select(
                            s => new Flash
                            {
                                Id = s.Id,
                                IdDateNavigation = s.IdDateNavigation,
                                Ltype = s.Ltype,
                                Latitude = s.Latitude,
                                Longitude = s.Longitude,
                                Peakcurrent = s.Peakcurrent,
                                Icheight = s.Icheight,
                                Sensor = s.Sensor,
                                Icmulti = s.Icmulti,
                                Cgmulti = s.Cgmulti,
                            }
                        ).ToListAsync();
            else
                return await DbContext.Flashes.Where(t => t.Ltype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && t.Ltype == type)
                            .Select(
                            s => new Flash
                            {
                                Id = s.Id,
                                IdDateNavigation = s.IdDateNavigation,
                                Ltype = s.Ltype,
                                Latitude = s.Latitude,
                                Longitude = s.Longitude,
                                Peakcurrent = s.Peakcurrent,
                                Icheight = s.Icheight,
                                Sensor = s.Sensor,
                                Icmulti = s.Icmulti,
                                Cgmulti = s.Cgmulti,
                            }
                        ).ToListAsync();
        }

        #endregion
        //Pulse Search
        #region
        public async Task<List<Pulse>> GetLightningPulse(DateTime initial, DateTime final, int[] peak, int type)
        {
            if (type == 2)
                return await DbContext.Pulses.Where(t => t.Ptype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && peak[0] <= t.Peakcurrent && t.Peakcurrent <= peak[1] && t.Ptype <= type)
                 .Select(
                 s => new Pulse
                 {
                     Id = s.Id,
                     IdDateNavigation = s.IdDateNavigation,
                     Ptype = s.Ptype,
                     Latitude = s.Latitude,
                     Longitude = s.Longitude,
                     Peakcurrent = s.Peakcurrent,
                     Icheight = s.Icheight,
                     Sensor = s.Sensor,
                 }
             ).ToListAsync();
            else
                return await DbContext.Pulses.Where(t => t.Ptype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && peak[0] <= t.Peakcurrent && t.Peakcurrent <= peak[1] && t.Ptype == type)
                    .Select(
                    s => new Pulse
                    {
                        Id = s.Id,
                        IdDateNavigation = s.IdDateNavigation,
                        Ptype = s.Ptype,
                        Latitude = s.Latitude,
                        Longitude = s.Longitude,
                        Peakcurrent = s.Peakcurrent,
                        Icheight = s.Icheight,
                        Sensor = s.Sensor,
                    }
                ).ToListAsync();
        }
        public async Task<List<Pulse>> GetLightningPulse(DateTime initial, DateTime final, int type)
        {

            //List<Flash> list_dates_id = await DbContext.Dates.Where(  t =>  initial <= t.Date1 && t.Date1 <= final).Select(s =>
            //new Date
            //{
            //    id = s.id,
            //    Ltime = s.Ltime,
            //}).ToListAsync();
            //return null;
            if (type == 2)
                return await DbContext.Pulses.Where(t => t.Ptype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && t.Ptype <= type)
                            .Select(
                            s => new Pulse
                            {
                                Id = s.Id,
                                IdDateNavigation = s.IdDateNavigation,
                                Ptype = s.Ptype,
                                Latitude = s.Latitude,
                                Longitude = s.Longitude,
                                Peakcurrent = s.Peakcurrent,
                                Icheight = s.Icheight,
                                Sensor = s.Sensor,
                            }
                        ).ToListAsync();
            else
                return await DbContext.Pulses.Where(t => t.Ptype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && t.Ptype == type)
                            .Select(
                            s => new Pulse
                            {
                                Id = s.Id,
                                IdDateNavigation = s.IdDateNavigation,
                                Ptype = s.Ptype,
                                Latitude = s.Latitude,
                                Longitude = s.Longitude,
                                Peakcurrent = s.Peakcurrent,
                                Icheight = s.Icheight,
                                Sensor = s.Sensor,
                            }
                        ).ToListAsync();
        }

        #endregion
    }
    public class UserService
    {
        private readonly Models.UsersDbContext DbContext;
        private readonly string _appSettings;
        
        public UserService( Models.UsersDbContext DbContext)
        {
            this.DbContext = DbContext;
            _appSettings = "ESTACIONESINSMET";
        }
        public User GetById(int id)
        {
            return DbContext.Users.FirstOrDefault(x => x.Id == id);
        }
        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = DbContext.Users.SingleOrDefault(x => x.Username == model.Username && x.Token == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }
        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<List<User>> GetAll()
        {

            return await DbContext.Users.ToListAsync();
        }
    }
}

