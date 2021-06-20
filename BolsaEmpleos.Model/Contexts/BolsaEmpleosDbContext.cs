using BolsaEmpleos.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BolsaEmpleos.Model.Contexts
{
    public class BolsaEmpleosDbContext : DbContext, IBolsaEmpleosDbContext
    {
        public BolsaEmpleosDbContext(DbContextOptions<BolsaEmpleosDbContext> options) : base(options)
        {
        }

        #region Tables

        public DbSet<Position> Positions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        
        #endregion

        public DbSet<T> GetDbSet<T>() where T : class => Set<T>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicantJob>()
                .HasKey(ap => new { ap.ApplicantId, ap.PositionId});
            modelBuilder.Entity<ApplicantJob>()
                .HasOne(ap => ap.Applicant)
                .WithMany(x => x.ApplicantJobs)
                .HasForeignKey(ap => ap.ApplicantId);
            modelBuilder.Entity<ApplicantJob>()
                .HasOne(ap => ap.Position)
                .WithMany(x => x.ApplicantJobs)
                .HasForeignKey(ap => ap.PositionId);
            
            var mutableForeignKeys = modelBuilder.Model
                .GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys());
            
            foreach (var relationship in mutableForeignKeys)
                relationship.DeleteBehavior = DeleteBehavior.Restrict;           
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
