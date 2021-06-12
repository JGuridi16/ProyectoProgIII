using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Factories;

namespace BolsaEmpleos.Model.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
    }

    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
