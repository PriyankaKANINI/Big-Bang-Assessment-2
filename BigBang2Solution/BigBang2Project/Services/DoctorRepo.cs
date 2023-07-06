using BigBang2Project.Interfaces;
using BigBang2Project.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using BigBang2Project.Models.DTOs;

namespace BigBang2Project.Services
{
    public class DoctorRepo : IRepo<int, Doctor>
    {
        private readonly Context _context;
        private readonly ILogger<DoctorRepo> _logger;

        public DoctorRepo(Context context, ILogger<DoctorRepo> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Doctor?> Add(Doctor item)
        {
            try
            {
                _context.Doctors.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Doctor?> Delete(int key)
        {
            try
            {
                var doctor = await Get(key);
                if (doctor != null)
                {
                    _context.Doctors.Remove(doctor);
                    await _context.SaveChangesAsync();
                    return doctor;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Doctor?> Get(int key)
        {
            try
            {
                var doctor = await _context.Doctors.FirstOrDefaultAsync(s => s.DoctorID == key);
                return doctor;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Doctor>?> GetAll()
        {
            try
            {
                var doctorList = await _context.Doctors.ToListAsync();
                if (doctorList.Count > 0)
                    return doctorList;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Doctor?> Update(Doctor item)
        {
            try
            {
                var doctor = await Get(item.DoctorID);
                if (doctor != null)
                {
                    doctor.DoctorName = item.DoctorName;
                    doctor.DateOfBirth = item.DateOfBirth;
                    doctor.Age = item.Age;
                    doctor.Gender = item.Gender;
                    doctor.Phone = item.Phone;
                    doctor.Email = item.Email;
                    doctor.Experience = item.Experience;
                    doctor.Specialization = item.Specialization;
                    await _context.SaveChangesAsync();
                    return doctor;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
