using System.Collections.Generic;

namespace BolsaEmpleos.Services.Validators
{
    public class FileValidatorResult
    {
        public string Filename { get; set; }
        public List<string> Errors { get; set; }
        public bool IsValid { get; set; }
    }
}
