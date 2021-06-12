using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Factories;

namespace BolsaEmpleos.Model.Repositories
{
    public interface IAplicantRepository : IRepository<Aplicant>
    {
    }

    public class AplicantRepository : Repository<Aplicant>, IAplicantRepository
    {
        public AplicantRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
