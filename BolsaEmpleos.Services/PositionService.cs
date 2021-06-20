using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolsaEmpleos.Services
{
    public interface IPositionService : IGenericService<Position>
    {
        Task<IEnumerable<Position>> GetAll();
        Position GetOne(int id);
        Task<Position> Save(Position position);
        Task<Position> Update(int id, Position position);
        Task<Position> Delete(int id);
    }

    public class PositionService : GenericService<Position>, IPositionService
    {
        private readonly IPositionRepository _repository;

        public PositionService(IPositionRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }


        public async Task<IEnumerable<Position>> GetAll()
        {
            return await _repository.GetAll()
                .ToListAsync();
        }

        public Position GetOne(int id)
        {
            return _repository.GetByIdAsNoTracking(id);
        }

        public async Task<Position> Save(Position position)
        {
            _repository.Add(position);

            await _uow.CommitAsync();

            return position;
        }

        public async Task<Position> Update(int id, Position position)
        {
            var entity = _repository.GetByIdAsNoTracking(id);
            if (entity is null) return null;

            _repository.Update(position);

            await _uow.CommitAsync();

            return entity;
        }

        public async Task<Position> Delete(int id)
        {
            var entity = _repository.GetById(id);
            if (entity is null) return null;

            _repository.Delete(id);

            await _uow.CommitAsync();

            return entity;
        }
    }
}
