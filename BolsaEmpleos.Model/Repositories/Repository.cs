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
        private DbSet<T> _dbSet;

        protected DbSet<T> DbSet
        {
            get => _dbSet ??= _dbFactory.DbContext.Set<T>();
        }

        public Repository(DbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public IQueryable<T> List(Expression<Func<T, bool>> expression)
        {
            return DbSet.Where(expression);
        }

        public void Add(T entity)
        {
            DbSet.Add(entity);
        }

        public void Update(T entity)
        {
            DbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            if (typeof(BaseEntity).IsAssignableFrom(typeof(T)))
            {
                (entity).IsDeleted = true;
                DbSet.Update(entity);
            }
            else
                DbSet.Remove(entity);
        }
    }
}
