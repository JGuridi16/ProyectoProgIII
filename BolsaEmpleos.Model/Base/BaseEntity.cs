namespace BolsaEmpleos.Model.Base
{
    public class BaseEntity : IBaseEntity
    {
        public virtual int Id { get; set; }
        public virtual bool IsDeleted { get; set; }
    }
}
