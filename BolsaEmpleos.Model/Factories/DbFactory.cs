using BolsaEmpleos.Model.Contexts;
using Microsoft.EntityFrameworkCore;
using System;

namespace BolsaEmpleos.Model.Factories
{
    public class DbFactory : IDisposable
    {
        private bool _disposed;
        private readonly Func<BolsaEmpleosDbContext> _instanceFunc;
        private DbContext _dbContext;
        public DbContext DbContext => _dbContext ??= _instanceFunc.Invoke();

        public DbFactory(Func<BolsaEmpleosDbContext> dbContextFactory)
        {
            _instanceFunc = dbContextFactory;
        }

        public void Dispose()
        {
            if (!_disposed && _dbContext != null)
            {
                _disposed = true;
                _dbContext.Dispose();
            }
        }
    }
}
