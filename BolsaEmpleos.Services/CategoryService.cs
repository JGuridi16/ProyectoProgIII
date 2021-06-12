using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;

namespace BolsaEmpleos.Services
{
    public interface ICategoryService : IGenericService<Category>
    {
    }

    public class CategoryService : GenericService<Category>, ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }
    }
}
