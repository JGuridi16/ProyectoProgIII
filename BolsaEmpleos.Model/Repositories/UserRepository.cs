using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Factories;

namespace BolsaEmpleos.Model.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
    }

    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
