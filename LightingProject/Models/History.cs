using System;
using System.Collections.Generic;

#nullable disable

namespace LightingProject.Models
{
    public partial class History
    {
        public History()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public int FormsHistory { get; set; }
        public int Connections { get; set; }

        public virtual Conection ConnectionsNavigation { get; set; }
        public virtual FormHistory FormsHistoryNavigation { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
