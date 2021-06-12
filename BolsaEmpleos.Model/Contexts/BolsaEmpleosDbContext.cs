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
        public DbSet<Position> Positions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Aplicant> Aplicants { get; set; }
        #endregion

        public DbSet<T> GetDbSet<T>() where T : class => Set<T>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
