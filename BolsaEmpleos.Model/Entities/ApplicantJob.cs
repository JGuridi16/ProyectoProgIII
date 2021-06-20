namespace BolsaEmpleos.Model.Entities
{
    public class ApplicantJob
    {
        public int ApplicantId { get; set; }
        public User Applicant { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
    }
}
