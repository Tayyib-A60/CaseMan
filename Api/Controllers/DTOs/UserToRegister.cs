using System.ComponentModel.DataAnnotations;
using Api.Core.Models;

namespace Api.Controllers.DTOs
{
    public class UserToRegister
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}