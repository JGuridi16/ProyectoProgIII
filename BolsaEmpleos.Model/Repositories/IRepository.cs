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
        IQueryable<T> Where(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties);
        IQueryable<T> GetAll(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties);
        T GetById(int id, params Expression<Func<T, object>>[] includeProperties);
    }
}
