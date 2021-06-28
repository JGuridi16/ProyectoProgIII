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
        protected readonly DbSet<T> _dbSet;

        public Repository(DbFactory dbFactory)
        {
            _dbFactory = dbFactory;
            _dbSet = _dbSet ??= _dbFactory.DbContext.Set<T>();
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable()
                .Where(x => x.IsDeleted == false);

            foreach (var includeProperty in includeProperties)
                list = list.Include(includeProperty);

            if (predicate is null)
                return list;

            return list.Where(predicate);
        }

        public virtual T GetById(int id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable();

            foreach (var includeProperty in includeProperties)
                list = list.Include(includeProperty);

            return list.Where(x => x.IsDeleted == false)
                .FirstOrDefault(x => x.Id == id);
        }

        public virtual T GetByIdAsNoTracking(int id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable();

            foreach (var includeProperty in includeProperties)
                list = list.Include(includeProperty);

            return list.Where(x => x.IsDeleted == false)
                .AsNoTracking()
                .FirstOrDefault(x => x.Id == id);
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable();

            foreach (var includeProperty in includeProperties)
                list = list.Include(includeProperty);

            if (predicate is null)
                return list;

            return list.Where(predicate);
        }

        public bool Any(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> list = _dbSet.AsQueryable();

            foreach (var includeProperty in includeProperties)
            {
                list = list.Include(includeProperty);
            }

            if (predicate is null)
                return false;

            return list.Any(predicate);
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            _dbFactory.DbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            T entity = GetByIdAsNoTracking(id);
            _dbSet.Remove(entity);
        }
    }
}
