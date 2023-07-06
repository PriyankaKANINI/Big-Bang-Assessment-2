using BigBang2Project.Interfaces;
using BigBang2Project.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace BigBang2Project.Services
{
    public class PatientRepo : IRepo<int, Patient>
    {
        private readonly Context _context;
        private readonly ILogger<PatientRepo> _logger;

        public PatientRepo(Context context, ILogger<PatientRepo> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Patient?> Add(Patient item)
        {
            try
            {
                _context.Patients.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Patient?> Delete(int key)
        {
            try
            {
                var patient = await Get(key);
                if (patient != null)
                {
                    _context.Patients.Remove(patient);
                    await _context.SaveChangesAsync();
                    return patient;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Patient?> Get(int key)
        {
            try
            {
                var patient = await _context.Patients.FirstOrDefaultAsync(c => c.PatientID == key);
                return patient;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Patient>?> GetAll()
        {
            try
            {
                var patients = await _context.Patients.ToListAsync();
                if (patients.Count > 0)
                    return patients;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Patient?> Update(Patient item)
        {
            try
            {
                var patient = await Get(item.PatientID);
                if (patient != null)
                {
                    patient.PatientName = item.PatientName;
                    patient.DateOfBirth = item.DateOfBirth;
                    patient.Age = item.Age;
                    patient.Gender = item.Gender;
                    patient.Phone = item.Phone;
                    patient.Email = item.Email;
                    patient.Illness = item.Illness;
                    await _context.SaveChangesAsync();
                    return patient;
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
