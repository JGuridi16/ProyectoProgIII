using BolsaEmpleos.Services;
using Microsoft.AspNetCore.Mvc;

namespace BolsaEmpleos.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AplicantController : ControllerBase
    {
        private readonly IAplicantService _service;

        public AplicantController(IAplicantService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult Post()
        {
            return Ok();
        }

        [HttpPut]
        public IActionResult Put()
        {
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            return Ok();
        }
    }
}
