using System.ComponentModel.DataAnnotations;

namespace Api.Core.Models
{
    public class Case
    {
        public int CaseId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public bool ReviewedByAdmin { get; set; }
        public string AdminComment { get; set; }
    }
}