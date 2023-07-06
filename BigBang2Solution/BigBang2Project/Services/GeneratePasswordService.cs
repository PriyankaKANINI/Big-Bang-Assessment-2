using BigBang2Project.Interfaces;
using BigBang2Project.Models;
using BigBang2Project.Models.DTOs;


namespace BigBang2Project.Services
{
    public class GeneratePasswordService : IPasswordGenerate
    {
        public async Task<string?> PasswordGenerateDoctor(Doctor doctor)
        {
            string password = String.Empty;
            password = doctor.DoctorName.Substring(0, 4);
            password += doctor.DateOfBirth.Day;
            password += doctor.DateOfBirth.Month;
            return password;
        }
        public async Task<string?> PasswordGeneratePatient(Patient patient)
        {
            string password = String.Empty;
            password = patient.PatientName.Substring(0, 4);
            password += patient.DateOfBirth.Day;
            password += patient.DateOfBirth.Month;
            return password;
        }
    }
}
