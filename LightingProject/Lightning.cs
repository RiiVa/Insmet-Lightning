using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<List<Flash>> GetLightning(DateTime initial, DateTime final, int[] peak, int type)
        {

            return await DbContext.Flashes.Where(t => t.Ltype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && peak[0] <= t.Peakcurrent && t.Peakcurrent <= peak[1] && t.Ltype <= type)
                .Select(
                s => new Flash
                {
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
            List<Flash> lists = await DbContext.Flashes.Where(t => t.Ltype != 9 && initial <= t.IdDateNavigation.Date1 && t.IdDateNavigation.Date1 <= final && t.Ltype <= type)
                            .Select(
                            s => new Flash
                            {
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
            return lists;
        }
    }
    }

