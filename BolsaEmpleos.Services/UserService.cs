using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;

namespace BolsaEmpleos.Services
{
    public interface IUserService : IGenericService<User>
    {
    }

    public class UserService : GenericService<User>, IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }
    }
}
