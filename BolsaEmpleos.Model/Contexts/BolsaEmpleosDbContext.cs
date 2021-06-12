using BolsaEmpleos.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace BolsaEmpleos.Model.Contexts
{
    public class BolsaEmpleosDbContext : DbContext, IBolsaEmpleosDbContext
    {
        public BolsaEmpleosDbContext(DbContextOptions<BolsaEmpleosDbContext> options) : base(options)
        {
        }

        #region Tables
        public DbSet<Example> Example { get; set; }
        #endregion

        public DbSet<T> GetDbSet<T>() where T : class => Set<T>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
