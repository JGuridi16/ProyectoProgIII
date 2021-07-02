using BolsaEmpleos.Model.Base;
using BolsaEmpleos.Model.Enums;
using System.Collections.Generic;

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
        public string Description { get; set; }
        public string CompanyEmail { get; set; }
        public int CategoryId { get; set; }
        public int PosterId { get; set; }
        public virtual Category Category { get; set; }
        public virtual User Poster { get; set; }
        public ICollection<ApplicantJob> ApplicantJobs { get; set; }
    }
}
