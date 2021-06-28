using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Factories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BolsaEmpleos.Model.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserByObjectIdAsync(string objectId);
    }

    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<User> GetUserByObjectIdAsync(string objectId)
        {
            return await _dbSet.AsQueryable()
                .Where(x => x.ObjectIdentifier.Equals(objectId))
                .FirstOrDefaultAsync();
        }
    }
}
