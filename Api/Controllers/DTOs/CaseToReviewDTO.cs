using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.DTOs
{
    public class CaseToReviewDTO
    {
        [Required]
        public int CaseId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }          
        [Required]
        public bool ReviewedByAdmin { get; set; }
        [Required]
        public string AdminComment { get; set; }      
    }
}