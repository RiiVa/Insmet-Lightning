using System;
using System.Collections.Generic;

#nullable disable

namespace LightingProject.Models
{
    public partial class WorkGroup
    {
        public WorkGroup()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
        public int? Vip { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
