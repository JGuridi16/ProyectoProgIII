using BolsaEmpleos.Model.Base;
using BolsaEmpleos.Model.Enums;
using System.Collections.Generic;

namespace BolsaEmpleos.Model.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public Role Role { get; set; }
        public string DocumentUri { get; set; }
        public ICollection<ApplicantJob> ApplicantJobs { get; set; }
    }
}
