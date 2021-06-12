using BolsaEmpleos.Model.Base;
using BolsaEmpleos.Model.Enums;

namespace BolsaEmpleos.Model.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public Role Role { get; set; }
    }
}
