using BolsaEmpleos.Model.Base;

namespace BolsaEmpleos.Model.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
