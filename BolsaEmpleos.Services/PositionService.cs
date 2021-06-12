using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;

namespace BolsaEmpleos.Services
{
    public interface IPositionService : IGenericService<Position>
    {
    }

    public class PositionService : GenericService<Position>, IPositionService
    {
        private readonly IPositionRepository _repository;

        public PositionService(IPositionRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }
    }
}
