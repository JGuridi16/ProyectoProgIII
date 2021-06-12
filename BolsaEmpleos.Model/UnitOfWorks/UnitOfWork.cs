using BolsaEmpleos.Model.Factories;
using System.Threading.Tasks;

namespace BolsaEmpleos.Model.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbFactory _dbFactory;

        public UnitOfWork(DbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public async Task<int> CommitAsync()
        {
            return await _dbFactory.DbContext.SaveChangesAsync();
        }
    }
}
