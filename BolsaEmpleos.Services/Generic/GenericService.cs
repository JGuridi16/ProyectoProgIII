using BolsaEmpleos.Model.Base;
using BolsaEmpleos.Model.UnitOfWorks;

namespace BolsaEmpleos.Services.Generic
{
    public interface IGenericService<TEntity> where TEntity : class, IBaseEntity
    {
    }

    public class GenericService<TEntity> : IGenericService<TEntity> where TEntity : class, IBaseEntity
    {
        protected readonly IUnitOfWork _uow;

        public GenericService(IUnitOfWork uow)
        {
            _uow = uow;
        }
    }
}
