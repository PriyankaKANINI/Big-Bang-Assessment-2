using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace BigBang2Project.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions options) : base(options) 
        {
               
        }
        public DbSet<User>? Users { get; set; }
        public DbSet<Patient>? Patients { get; set; }
        public DbSet<Doctor>? Doctors { get; set; }
    }
}
