using BigBang2Project.Interfaces;
using BigBang2Project.Models.DTOs;
using BigBang2Project.Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace BigBang2Project.Services
{
    public class ManageUserService : IManageUser
    {
        private readonly IRepo<int, User> _userRepo;
        private readonly IRepo<int, Patient> _patientRepo;
        private readonly IRepo<int, Doctor> _doctorRepo;
        private readonly IPasswordGenerate _passwordService;
        private readonly ITokenGenerate _tokenService;

        public ManageUserService(IRepo<int, User> userRepo,
            IRepo<int, Patient> patientRepo,
            IPasswordGenerate passwordService,
            IRepo<int, Doctor> doctorRepo,
            ITokenGenerate tokenService)
        {
            _userRepo = userRepo;
            _patientRepo = patientRepo;
            _passwordService = passwordService;
            _doctorRepo = doctorRepo;
            _tokenService = tokenService;
        }


        public async Task<UserDTO> Login(UserDTO user)
        {

            var userData = await _userRepo.Get(user.UserID);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.PasswordKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.PasswordHash[i])
                        return null;
                }
                user = new UserDTO();
                user.UserID = userData.UserID;
                user.UserRole = userData.UserRole;
                user.Token = _tokenService.TokenGenerate(user);
            }
            return user;
        }

        public async Task<UserDTO> PatientRegister(Patient patient)
        {
            UserDTO user = null;
            var hmac = new HMACSHA512();
            string ?generatedPassword = await _passwordService.PasswordGeneratePatient(patient);

            patient.User = new User();

            patient.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(generatedPassword));
            patient.User.PasswordKey = hmac.Key;
            patient.User.UserRole = "Patient";
            var userResult = await _userRepo.Add(patient.User);
            var patientResult = await _patientRepo.Add(patient);

            if (userResult != null && patientResult != null)
            {
                user = new UserDTO();
                user.UserID = patientResult.PatientID;
                user.UserRole = userResult.UserRole;
                user.Token = _tokenService.TokenGenerate(user);
            }

            return user;
        }

        public async Task<UserDTO> DoctorRegister(Doctor doctor)
        {
            UserDTO user = null;
            var hmac = new HMACSHA512();
            string ?generatedPassword = await _passwordService.PasswordGenerateDoctor(doctor);

            doctor.User = new User();

            doctor.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(generatedPassword));
            doctor.User.PasswordKey = hmac.Key;
            doctor.User.UserRole = "Doctor";
            doctor.Status = false;

            var userResult = await _userRepo.Add(doctor.User);
            var doctorResult = await _doctorRepo.Add(doctor);

            if (userResult != null && doctorResult != null)
            {
                user = new UserDTO();
                user.UserID = doctorResult.DoctorID;
                user.UserRole = userResult.UserRole;
                user.Token = _tokenService.TokenGenerate(user);
            }
            return user;
        }

        public async Task<Doctor> UpdateDoctorDetails(int doctorID, DoctorDTO doctor)
        {
            var existingDoctor = await _doctorRepo.Get(doctorID);
            if (existingDoctor == null)
            {
                return null;
            }

            existingDoctor.DoctorName = doctor.DoctorName;
            existingDoctor.DateOfBirth = doctor.DateOfBirth;
            existingDoctor.Age = doctor.Age;
            existingDoctor.Gender = doctor.Gender;
            existingDoctor.Phone = doctor.Phone;
            existingDoctor.Email = doctor.Email;
            existingDoctor.Specialization = doctor.Specialization;
            existingDoctor.Experience = doctor.Experience;

            return await _doctorRepo.Update(existingDoctor);
        }

        public async Task<ICollection<Doctor>> GetAllDoctorDetails()
        {
            var doctors = await _doctorRepo.GetAll();
            return doctors;
        }

        public async Task<Doctor> GetDoctorById(int doctorID)
        {
            var doctor = await _doctorRepo.Get(doctorID);
            return doctor;
        }

        public async Task<Doctor> DeleteDoctor(int doctorID)
        {
            var doctor = await _doctorRepo.Delete(doctorID);
            return doctor;
        }

        public async Task<Doctor> ApproveDoctor(int doctorID)
        {
            var doctorResult = await _doctorRepo.Get(doctorID);

            if (doctorResult != null)
            {
                doctorResult.Status = true;
                await _doctorRepo.Update(doctorResult);
            }
            return doctorResult;
        }

        public async Task<Doctor> DisapproveDoctor(int doctorID)
        {
            var doctorResult = await _doctorRepo.Get(doctorID);

            if (doctorResult != null)
            {
                doctorResult.Status = true;
                await _doctorRepo.Update(doctorResult);
            }
            return doctorResult;
        }
        public async Task<ICollection<Doctor>> GetAllApprovedDoctors()
        {
            var doctors = await _doctorRepo.GetAll();
            var approvedDoctors = doctors.Where(d => d.Status == true).ToList();
            return approvedDoctors;
        }

        public async Task<ICollection<Doctor>> GetAllDisapprovedDoctors()
        {
            var doctors = await _doctorRepo.GetAll();
            var disapprovedDoctors = doctors.Where(d => d.Status == false).ToList();
            return disapprovedDoctors;
        }

        public async Task<ICollection<Patient>> GetAllPatients()
        {
            var patients = await _patientRepo.GetAll();
            return patients;
        }

    }
}


























