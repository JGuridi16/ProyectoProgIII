using BolsaEmpleos.Model.Base;

namespace BolsaEmpleos.Model.Entities
{
    public class Aplicant : BaseEntity
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string DocumentName { get; set; }
        public int PositionId { get; set; }
    }
}
