using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Factories;

namespace BolsaEmpleos.Model.Repositories
{
    public interface IPositionRepository : IRepository<Position>
    {
    }

    public class PositionRepository : Repository<Position>, IPositionRepository
    {
        public PositionRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
