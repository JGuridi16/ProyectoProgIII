using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BolsaEmpleos.Services
{
    public interface IUserService : IGenericService<User>
    {
        Task<IEnumerable<User>> GetAll();
        User GetOne(int id);
        Task<User> Save(User user);
        Task<User> Update(int id, User user);
        Task<User> Delete(int id);
    }

    public class UserService : GenericService<User>, IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _repository.GetAll()
                .ToListAsync();
        }

        public User GetOne(int id)
        {
            return _repository.GetByIdAsNoTracking(id);
        }

        public async Task<User> Save(User user)
        {
            _repository.Add(user);

            await _uow.CommitAsync();

            return user;
        }

        public async Task<User> Update(int id, User user)
        {
            var entity = _repository.GetByIdAsNoTracking(id);
            if (entity is null) return null;

            _repository.Update(user);

            await _uow.CommitAsync();

            return entity;
        }

        public async Task<User> Delete(int id)
        {
            var entity = _repository.GetById(id);
            if (entity is null) return null;

            _repository.Delete(id);

            await _uow.CommitAsync();

            return entity;
        }
    }
}
