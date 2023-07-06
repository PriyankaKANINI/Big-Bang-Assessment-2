using BigBang2Project.Models;
using BigBang2Project.Models.DTOs;

namespace BigBang2Project.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO> Login(UserDTO user);
        public Task<UserDTO> PatientRegister(Patient patient);
        public Task<UserDTO> DoctorRegister(Doctor doctor);
        public Task<Doctor> ApproveDoctor(int doctorID);
        public Task<Doctor> DisapproveDoctor(int doctorID);
        public Task<Doctor> UpdateDoctorDetails(int doctorID, DoctorDTO doctor);
        public Task<ICollection<Doctor>> GetAllDoctorDetails();
        public Task<Doctor> GetDoctorById(int doctorID);
        public Task<Doctor> DeleteDoctor(int doctorID);
        public Task<ICollection<Doctor>> GetAllApprovedDoctors();
        public Task<ICollection<Doctor>> GetAllDisapprovedDoctors();
        public Task<ICollection<Patient>> GetAllPatients();

    }
}
