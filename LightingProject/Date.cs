using System;
using System.Collections.Generic;

#nullable disable

namespace LightingProject
{
    public partial class Date
    {
        public Date()
        {
            Flashes = new HashSet<Flash>();
            Pulses = new HashSet<Pulse>();
        }

        public int Id { get; set; }
        public DateTime Date1 { get; set; }

        public virtual ICollection<Flash> Flashes { get; set; }
        public virtual ICollection<Pulse> Pulses { get; set; }
    }
}
