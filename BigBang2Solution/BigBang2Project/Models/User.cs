using System.ComponentModel.DataAnnotations;

namespace BigBang2Project.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string? UserRole { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordKey { get; set; }
    }
}
