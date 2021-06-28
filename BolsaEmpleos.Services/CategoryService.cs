using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BolsaEmpleos.Services
{
    public interface ICategoryService : IGenericService<Category>
    {
        Task<IEnumerable<Category>> GetAll();
        Category GetOne(int id);
        Task<Category> Save(Category category);
        Task<Category> Update(int id, Category category);
        Task<Category> Delete(int id);
    }

    public class CategoryService : GenericService<Category>, ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _repository.GetAll()
                .ToListAsync();
        }

        public Category GetOne(int id)
        {
            return _repository.GetByIdAsNoTracking(id);
        }

        public async Task<Category> Save(Category category)
        {
            _repository.Add(category);

            await _uow.CommitAsync();

            return category;
        }

        public async Task<Category> Update(int id, Category category)
        {
            var entityExists = _repository.Any(x => x.Id.Equals(id));

            if (!entityExists) return null;

            _repository.Update(category);

            await _uow.CommitAsync();

            return _repository.GetById(id);
        }

        public async Task<Category> Delete(int id)
        {
            var entityExists = _repository.Any(x => x.Id.Equals(id));

            if (!entityExists) return null;

            _repository.Delete(id);

            await _uow.CommitAsync();

            return _repository.GetById(id);
        }
    }
}
