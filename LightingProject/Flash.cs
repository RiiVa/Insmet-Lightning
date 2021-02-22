using System;
using System.Collections.Generic;

#nullable disable

namespace LightingProject
{
    public partial class Flash
    {
        public Flash()
        {
            Pulses = new HashSet<Pulse>();
        }

        public int Id { get; set; }
        public int? IdDate { get; set; }
        public short? Ltype { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public decimal? Icheight { get; set; }
        public decimal? Peakcurrent { get; set; }
        public long? Icmulti { get; set; }
        public long? Cgmulti { get; set; }
        public long? Sensor { get; set; }

        public virtual Date IdDateNavigation { get; set; }
        public virtual ICollection<Pulse> Pulses { get; set; }
    }
}
