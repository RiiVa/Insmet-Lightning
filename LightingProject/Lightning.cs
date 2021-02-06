using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

#nullable disable

namespace LightingProject
{
    public partial class Lightning
    {
        public DateTime? Ltime { get; set; }
        public int? Ltype { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public double? Peakcurrent { get; set; }
        public double? Icheight { get; set; }
        public int? Numsensors { get; set; }
        public int? Icmultiplicity { get; set; }
        public int? Cgmultiplicity { get; set; }
    }
    public partial class Form
    {
        public DateTime? Initial { get; set; }
        public DateTime? End { get; set; }
    }
    public class LightningService
    {
        private readonly lightning_testContext DbContext;

        public LightningService(lightning_testContext DbContext)
        {
            this.DbContext = DbContext;
        }
        public async Task< List<Lightning>> GetLightning(DateTime initial, DateTime final,int[] peak, int type)
        {
            
            return await DbContext.Lightnings.Where( t => t.Ltype != 9 && initial <= t.Ltime &&  t.Ltime <= final && peak[0] <= t.Peakcurrent && t.Peakcurrent <= peak[1] && t.Ltype <= type)
                .Select(
                s => new Lightning
                {
                    Ltime = s.Ltime,
                    Ltype = s.Ltype,
                    Latitude = s.Latitude,
                    Longitude = s.Longitude,
                    Peakcurrent = s.Peakcurrent,
                    Icheight = s.Icheight,
                    Numsensors = s.Numsensors,
                    Icmultiplicity = s.Icmultiplicity,
                    Cgmultiplicity = s.Cgmultiplicity,
                }
            ).ToListAsync();
        }
        public async Task<List<Lightning>> GetLightning(DateTime initial, DateTime final, int type)
        {

            return await DbContext.Lightnings.Where(t => t.Ltype != 9 && initial <= t.Ltime && t.Ltime <= final && t.Ltype <= type)
                .Select(
                s => new Lightning
                {
                    Ltime = s.Ltime,
                    Ltype = s.Ltype,
                    Latitude = s.Latitude,
                    Longitude = s.Longitude,
                    Peakcurrent = s.Peakcurrent,
                    Icheight = s.Icheight,
                    Numsensors = s.Numsensors,
                    Icmultiplicity = s.Icmultiplicity,
                    Cgmultiplicity = s.Cgmultiplicity,
                }
            ).ToListAsync();
        }
    }
}
