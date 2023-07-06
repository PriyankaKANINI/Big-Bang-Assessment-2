using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BigBang2Project.Models
{
    public class Doctor
    {
        [Key]
        public int DoctorID { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        [Required(ErrorMessage = "Name cannot be empty")]
        [StringLength(15, ErrorMessage = "Name cannot exceed 15 characters")]
        public string? DoctorName { get; set; }

        [Required(ErrorMessage = "Date of Birth cannot be empty")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Age cannot be empty")]
        [Range(21, 65, ErrorMessage = "Age must be between 21 and 99")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Gender cannot be empty")]
        [RegularExpression("^(Male|Female)$", ErrorMessage = "Invalid Gender")]
        public string? Gender { get; set; }

        [Required(ErrorMessage = "Phone cannot be empty")]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "Email cannot be empty")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Please enter your specialization")]
        public string? Specialization { get; set; }
        [Required(ErrorMessage = "Please enter your experience")]
        public int Experience { get; set; }
        public bool? Status { get; set; }
    }
}
