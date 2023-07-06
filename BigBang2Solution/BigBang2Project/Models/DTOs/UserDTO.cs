namespace BigBang2Project.Models.DTOs
{
    public class UserDTO
    {
        public int UserID { get; set; }
        public string? Password { get; set; }
        public string? UserRole { get; set; }
        public string? Token { get; set; }
    }
}
