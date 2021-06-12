using System.Threading.Tasks;

namespace BolsaEmpleos.Model.UnitOfWorks
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}
