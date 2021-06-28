using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BolsaEmpleos.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
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
        public IActionResult GetById([FromRoute] int id)
        {
            var position = _service.GetOne(id);
            return Ok(position);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Position position)
        {
            var entity = await _service.Save(position);
            return Ok(entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Position position)
        {
            position.Id = id;
            var entity = await _service.Update(id, position);
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var entity = await _service.Delete(id);
            return Ok(entity);
        }
    }
}
