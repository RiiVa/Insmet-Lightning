using System;
using System.Collections.Generic;

#nullable disable

namespace LightingProject
{
    public partial class Pulse
    {
        public int Id { get; set; }
        public int IdFlash { get; set; }
        public int IdDate { get; set; }
        public int? Ptype { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public decimal? Peakcurrent { get; set; }
        public decimal? Icheight { get; set; }
        public int? Sensor { get; set; }
        public decimal? Major { get; set; }
        public decimal? Minor { get; set; }
        public decimal? Bearing { get; set; }

        public virtual Date IdDateNavigation { get; set; }
        public virtual Flash IdFlashNavigation { get; set; }
    }
}
