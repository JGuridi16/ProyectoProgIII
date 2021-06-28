using BolsaEmpleos.Model.Base;
using BolsaEmpleos.Model.Enums;
using System.Collections.Generic;

namespace BolsaEmpleos.Model.Entities
{
    public class User : BaseEntity
    {
        public string ObjectIdentifier { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public Role Role { get; set; }
        public string DocumentUrl { get; set; }
        public bool IsActive { get; set; }
        public ICollection<ApplicantJob> ApplicantJobs { get; set; }
    }
}
