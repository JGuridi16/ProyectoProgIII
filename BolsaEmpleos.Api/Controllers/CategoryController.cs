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
    public class CategoryController : Controller
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = await _service.GetAll();
            return Ok(categories);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var category = _service.GetOne(id);
            return Ok(category);
        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] Category category)
        {
            var entity = await _service.Save(category);
            return Ok(entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Category category)
        {
            category.Id = id;
            var entity = await _service.Update(id, category);
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
