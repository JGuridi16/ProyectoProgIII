using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Factories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace BolsaEmpleos.Model.Repositories
{
    public interface IExampleRepository : IRepository<Example>
    {
    }

    public class ExampleRepository : Repository<Example>, IExampleRepository
    {
        public ExampleRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
