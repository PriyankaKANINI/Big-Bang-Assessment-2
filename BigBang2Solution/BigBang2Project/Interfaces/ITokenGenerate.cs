using BigBang2Project.Models.DTOs;

namespace BigBang2Project.Interfaces
{
    public interface ITokenGenerate
    {
        public string TokenGenerate(UserDTO user);
    }
}
