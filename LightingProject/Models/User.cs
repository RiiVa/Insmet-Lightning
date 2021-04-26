using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace LightingProject.Models
{
    [Table("user")]
    public partial class User
    {
        [Key]
        public int Id { get; set; }
        public int IdWork { get; set; }
        public int IdHistory { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime? InitialCreate { get; set; }
        public int? Status { get; set; }

        public virtual History IdHistoryNavigation { get; set; }
        public virtual WorkGroup IdWorkNavigation { get; set; }
    }
    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.Firstname;
            LastName = user.Lastname;
            Username = user.Username;
            Token = token;
        }
    }
}
