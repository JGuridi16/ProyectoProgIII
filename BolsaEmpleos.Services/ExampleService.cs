using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;

namespace BolsaEmpleos.Services
{
    public interface IExampleService : IGenericService<Example>
    {
        void Add(Example example);
    }

    public class ExampleService : GenericService<Example>, IExampleService
    {
        private readonly ExampleRepository _repository;

        public ExampleService(ExampleRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }
        
        public void Add(Example example)
        {
            example = new Example() { Value = "example" };
            _repository.Add(example);
        }
    }
}
