using System;
using System.Collections.Generic;

#nullable disable

namespace LightingProject.Models
{
    public partial class FormHistory
    {
        public FormHistory()
        {
            Histories = new HashSet<History>();
        }

        public int Id { get; set; }
        public DateTime? Init { get; set; }
        public DateTime? End { get; set; }
        public decimal? PeakInit { get; set; }
        public decimal? PeakEnd { get; set; }
        public bool? Cg { get; set; }
        public bool? Ic { get; set; }
        public bool? Pulse { get; set; }
        public bool? Flash { get; set; }

        public virtual ICollection<History> Histories { get; set; }
    }
}
