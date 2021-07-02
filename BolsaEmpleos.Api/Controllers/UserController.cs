using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BolsaEmpleos.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IWebHostEnvironment _env;

        public UserController(IUserService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        [AllowAnonymous]
        [HttpGet("google-login")]
        public IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [AllowAnonymous]
        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse([FromBody] User user)
        {
            if (user is null) 
                return Unauthorized();
            
            var userCreated = await _service.GetAndCreateCurrentUserIfNoExist(user);

            if (userCreated is null)
                return Unauthorized();

            return Ok(user);
        }

        [HttpPost("{userId}/[action]")]
        public async Task<IActionResult> UploadDocument([FromRoute] int userId, IFormFile file)
        {
            if (file is null)
                return BadRequest("File cannot be null");

            var savedFile = await _service.SaveFileAsync(file, _env, userId);

            if (!savedFile.IsValid && savedFile.Filename is null)
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);

            else if (!savedFile.IsValid)
                return BadRequest(savedFile.Errors);

            else
                return Ok(savedFile);
        }

        [HttpGet("[action]/{filename}")]
        public async Task<IActionResult> DownloadDocument([FromRoute] string filename)
        {
            if (filename is null)
                return NotFound();

            var provider = new FileExtensionContentTypeProvider();
            var filePath = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads", filename);

            bool isPdf = provider.TryGetContentType(filePath, out string contentType);

            if (!isPdf) contentType = "application/octet-stream";

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);

            return File(bytes, contentType, filename);
        }

        #region CRUD Methods

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _service.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var user = _service.GetOne(id);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] User user)
        {
            user.Id = id;
            var entity = await _service.Update(id, user);
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var entity = await _service.Delete(id);
            return Ok(entity);
        }

        #endregion
    }
}
