using BolsaEmpleos.Model.Base;
using BolsaEmpleos.Model.Enums;

namespace BolsaEmpleos.Model.Entities
{
    public class Position : BaseEntity
    {
        public string Company { get; set; }
        public ContractType ContractType { get; set; }
        public string Logo { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string CategoryId { get; set; }
        public virtual int Category { get; set; }
        public string Description { get; set; }
    }
}
