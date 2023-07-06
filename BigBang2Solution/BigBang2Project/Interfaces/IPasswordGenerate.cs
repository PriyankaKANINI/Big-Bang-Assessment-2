using BigBang2Project.Models;
using BigBang2Project.Models.DTOs;

namespace BigBang2Project.Interfaces
{
    public interface IPasswordGenerate
    {
        public Task<string?> PasswordGenerateDoctor(Doctor doctor);
        public Task<string?> PasswordGeneratePatient(Patient patient);
    }
}
