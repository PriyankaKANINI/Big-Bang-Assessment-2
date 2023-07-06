using BigBang2Project.Interfaces;
using BigBang2Project.Models.DTOs;
using BigBang2Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using System;
using BigBang2Project.Services;

namespace BigBang2Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IManageUser _manageUser;
        private readonly IRepo<int, Patient> _patientRepo;
        private readonly IRepo<int, Doctor> _doctorRepo;

        public UserController(IManageUser manageUser, IRepo<int, Patient> patientRepo, IRepo<int, Doctor> doctorRepo)
        {
            _manageUser = manageUser;
            _patientRepo = patientRepo;
            _doctorRepo = doctorRepo;
        }

        [HttpPost("register", Name = "PatientRegister")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> PatientRegister(PatientDTO patient)
        {
            try
            {
                var result = await _manageUser.PatientRegister(patient);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to register at this moment");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during patient registration: {ex.Message}");
            }
        }

        [HttpPost("register", Name = "DoctorRegister")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> DoctorRegister(DoctorDTO doctor)
        {
            try
            {
                var result = await _manageUser.DoctorRegister(doctor);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to register at this moment");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during doctor registration: {ex.Message}");
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> Login(UserDTO user)
        {
            try
            {
                var result = await _manageUser.Login(user);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to login");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during login: {ex.Message}");
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor>> UpdateDoctorDetails(int doctorID, DoctorDTO doctor)
        {
            try
            {
                var existingDoctor = await _doctorRepo.Get(doctorID);

                if (existingDoctor == null)
                    return NotFound();

                existingDoctor.DoctorName = doctor.DoctorName;
                existingDoctor.DateOfBirth = doctor.DateOfBirth;
                existingDoctor.Age = doctor.Age;
                existingDoctor.Gender = doctor.Gender;
                existingDoctor.Phone = doctor.Phone;
                existingDoctor.Email = doctor.Email;
                existingDoctor.Specialization = doctor.Specialization;
                existingDoctor.Experience = doctor.Experience;

                var updatedDoctor = await _doctorRepo.Update(existingDoctor);

                if (updatedDoctor != null)
                    return Ok(updatedDoctor);

                return BadRequest("Unable to update the doctor");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during doctor update: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [ProducesResponseType(typeof(ActionResult<IEnumerable<Doctor>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetAllDoctors()
        {
            try
            {
                var doctors = await _doctorRepo.GetAll();

                if (doctors != null)
                    return Ok(doctors);

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while getting doctors list: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetById")]
        [ProducesResponseType(typeof(ActionResult<Doctor>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor>> GetDoctorById(int doctorID)
        {
            try
            {
                var doctor = await _doctorRepo.Get(doctorID);

                if (doctor != null)
                    return Ok(doctor);

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while getting doctor details: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [ProducesResponseType(typeof(ActionResult<Doctor>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor>> DeleteDoctor(int doctorID)
        {
            try
            {
                var doctor = await _doctorRepo.Delete(doctorID);

                if (doctor != null)
                    return Ok("Doctor details deleted successfully");

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting doctor details: {ex.Message}");
            }
        }

        [HttpPost ("api/Doctor/ApproveDoctor")]
        [ProducesResponseType(typeof(ActionResult<Doctor>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ApprovDoctor(int doctorId)
        {
            try
            {
                var doctor = await _doctorRepo.Get(doctorId);

                if (doctor != null)
                {
                    doctor.Status = true;
                    await _doctorRepo.Update(doctor);
                    return Ok($"Doctor {doctorId} has been approved successfully.");
                }

                return NotFound($"Doctor {doctorId} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error approving doctor: {ex.Message}");
            }
        }

        [HttpPost("api/Doctor/DisapproveDoctor")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DisapproveDoctor(int doctorId)
        {
            try
            {
                var doctor = await _doctorRepo.Get(doctorId);

                if (doctor != null)
                {
                    doctor.Status = false;
                    await _doctorRepo.Update(doctor);
                    return Ok($"Doctor {doctorId} has been disapproved successfully.");
                }

                return NotFound($"Doctor {doctorId} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error disapproving doctor: {ex.Message}");
            }
        }
      

        [HttpGet("approved")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllApproved()
        {
            try
            {
                var doctors = await _manageUser.GetAllApprovedDoctors();
                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while retrieving the approved doctors: {ex.Message}");
            }
        }

        [HttpGet("disapproved")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllDisapproved()
        {
            try
            {
                var doctors = await _manageUser.GetAllDisapprovedDoctors();
                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while retrieving the disapproved doctors: {ex.Message}");
            }
        }

        [HttpGet("GetAllPatients")]
        [ProducesResponseType(typeof(ActionResult<IEnumerable<Patient>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Patient>>> GetAllPatients()
        {
            try
            {
                var patients = await _patientRepo.GetAll();

                if (patients != null)
                    return Ok(patients);

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while getting patients list: {ex.Message}");
            }
        }
    }
}

