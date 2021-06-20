using BolsaEmpleos.Model.Base;
using BolsaEmpleos.Model.Factories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace BolsaEmpleos.Model.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, IBaseEntity
    {
        private readonly DbFactory _dbFactory;
        private readonly DbSet<T> _dbSet;


        public Repository(DbFactory dbFactory)
        {
            _dbFactory = dbFactory;
            _dbSet = _dbSet ??= _dbFactory.DbContext.Set<T>();
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable();

            foreach (var includeProperty in includeProperties)
            {
                list = list.Include(includeProperty);
            }

            if (predicate is null)
                return list;

            return list.Where(predicate);
        }

        public virtual T GetById(int id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable();

            foreach (var includeProperty in includeProperties)
            {
                list = list.Include(includeProperty);
            }

            return list.FirstOrDefault(x => x.Id == id);
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable();

            foreach (var includeProperty in includeProperties)
            {
                list = list.Include(includeProperty);
            }

            if (predicate is null)
                return list;

            return list.Where(predicate);
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            if (typeof(BaseEntity).IsAssignableFrom(typeof(T)))
            {
                entity.IsDeleted = true;
                _dbSet.Update(entity);
            }
            else
                _dbSet.Remove(entity);
        }
    }
}
