namespace BolsaEmpleos.Model.Base
{
    public interface IBaseEntity
    {
        int Id { get; set; }
        bool IsDeleted { get; set; }
    }
}
