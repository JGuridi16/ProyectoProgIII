using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;

namespace BolsaEmpleos.Services
{
    public interface IAplicantService : IGenericService<Aplicant>
    {
    }

    public class AplicantService : GenericService<Aplicant>, IAplicantService
    {
        private readonly IAplicantRepository _repository;

        public AplicantService(IAplicantRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }
    }
}
