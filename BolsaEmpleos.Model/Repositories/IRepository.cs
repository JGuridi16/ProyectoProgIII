using System;
using System.Linq;
using System.Linq.Expressions;

namespace BolsaEmpleos.Model.Repositories
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
        IQueryable<T> List(Expression<Func<T, bool>> expression);
    }
}
