using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BigBang2Project.Models
{
    public class Patient
    {
        [Key]
        public int PatientID { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        [Required(ErrorMessage = "Name cannot be empty")]
        [StringLength(15, ErrorMessage = "Name cannot exceed 15 characters")]
        public string? PatientName { get; set; }

        [Required(ErrorMessage = "Date of Birth cannot be empty")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Age cannot be empty")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Gender cannot be empty")]
        [RegularExpression("^(Male|Female)$", ErrorMessage = "Invalid Gender")]
        public string? Gender { get; set; }

        [Required(ErrorMessage = "Phone cannot be empty")]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "Email cannot be empty")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Please specify illness")]
        public string? Illness { get; set; }
    }
}
