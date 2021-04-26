using System;
using System.Collections.Generic;

#nullable disable

namespace LightingProject.Models
{
    public partial class Conection
    {
        public Conection()
        {
            Histories = new HashSet<History>();
        }

        public int Id { get; set; }
        public string Ip { get; set; }
        public DateTime? Date { get; set; }
        public TimeSpan? Time { get; set; }

        public virtual ICollection<History> Histories { get; set; }
    }
}
