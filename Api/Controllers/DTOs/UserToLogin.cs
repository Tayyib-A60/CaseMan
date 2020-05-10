using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.DTOs
{
    public class UserToLogin {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}