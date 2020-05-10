using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Api.Core.Models;

namespace Api.Controllers.DTOs
{
    public class UserDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public Role Role { get; set; }
        public ICollection<Case> Cases { get; set; }
        public UserDTO()
        {
            this.Cases = new Collection<Case>();
        }
    }
}