using System.ComponentModel.DataAnnotations;
using Api.Core.Models;

namespace Api.Controllers.DTOs
{
    public class CaseToCreateDTO
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }     
    }
}