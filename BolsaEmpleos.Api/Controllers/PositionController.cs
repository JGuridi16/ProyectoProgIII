using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BolsaEmpleos.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _service;

        public PositionController(IPositionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var positions = await _service.GetAll();
            return Ok(positions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var position = await _service.GetOne(id);
            return Ok(position);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Position position)
        {
            var entity = _service.Save(position);
            return Ok(entity);
        }

        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] int id, [FromBody] Position position)
        {
            var entity = _service.Update(id, position);
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var entity = _service.Delete(id);
            return Ok(entity);
        }
    }
}
