using BolsaEmpleos.Model.Entities;
using BolsaEmpleos.Model.Enums;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using BolsaEmpleos.Services.Generic;
using BolsaEmpleos.Services.Validators;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BolsaEmpleos.Services
{
    public interface IUserService : IGenericService<User>
    {
        Task<IEnumerable<User>> GetAll();
        User GetOne(int id);
        Task<FileValidatorResult> SaveFileAsync(IFormFile file, IWebHostEnvironment env, int userId);
        Task<User> GetAndCreateCurrentUserIfNoExist(AuthenticateResult result);
        Task<User> Save(User user);
        Task<User> Update(int id, User user);
        Task<User> Delete(int id);
    }

    public class UserService : GenericService<User>, IUserService
    {
        private readonly IUserRepository _repository;
        private const int Size5MB = 1024 * 1024 * 5;
        private string[] supportedFormats = { ".pdf" };

        public UserService(IUserRepository repository, IUnitOfWork uow) : base(uow)
        {
            _repository = repository;
        }

        public async Task<User> GetAndCreateCurrentUserIfNoExist(AuthenticateResult authenticateResult)
        {
            var claims = authenticateResult.Principal.Identities
                .FirstOrDefault()
                .Claims
                .Select(claim => new
                {
                    claim.Issuer,
                    claim.OriginalIssuer,
                    claim.Type,
                    claim.Value
                })
                .ToList();

            if (claims[0]?.Value is null) return null;

            string objectId = claims[0].Value;
            var userCreated = await _repository.GetUserByObjectIdAsync(objectId);

            if (userCreated is null)
            {
                var user = new User()
                {
                    ObjectIdentifier = objectId,
                    Name = claims[2].Value,
                    Lastname = claims[3].Value,
                    Email = claims[4].Value,
                    Role = Role.USER,
                    IsActive = true
                };

                await Save(user);
            }
            else if (!userCreated.IsActive)
                return null;

            return userCreated;
        }

        public async Task<FileValidatorResult> SaveFileAsync(IFormFile file, IWebHostEnvironment env, int userId)
        {
            try
            {
                if (file.Length > Size5MB)
                    return GenerateValidator(false, file.FileName, new List<string>() { "File size is too large" });

                string ext = Path.GetExtension(file.FileName);

                if (!supportedFormats.Contains(ext))
                    return GenerateValidator(false, file.FileName, new List<string>() { "Extension not supported" });

                var physicalPath = GetUniqueGuid(ext, env);
                string filename = Path.GetFileName(physicalPath);

                using var stream = new FileStream(physicalPath, FileMode.CreateNew);
                file.CopyTo(stream);

                var user = _repository.GetById(userId);
                user.DocumentUrl = filename;

                await Update(userId, user);

                return GenerateValidator(true, filename);
            }
            catch (Exception ex) 
            { 
                return GenerateValidator(false, null, new List<string> { ex.Message });
            }
        }

        #region Private Methods

        private string GetUniqueGuid(string ext, IWebHostEnvironment env)
        {
            Guid uuid = Guid.NewGuid();
            string filename = uuid + ext;
            string directory = Path.Combine(env.ContentRootPath, "wwwroot", "uploads");
            var physicalPath = Path.Combine(directory, filename);

            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            while (File.Exists(physicalPath))
            {
                uuid = Guid.NewGuid();
                filename = uuid + ext;
                physicalPath = Path.Combine(env.ContentRootPath, "wwwroot", "uploads", filename);
            }

            return physicalPath;
        }

        private FileValidatorResult GenerateValidator(bool isValid, string filename = null, List<string> errors = null)
        {
            return new FileValidatorResult()
            {
                IsValid = isValid,
                Filename = filename,
                Errors = errors
            };
        }

        #endregion

        #region CRUD Methods

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _repository.GetAll()
                .ToListAsync();
        }

        public User GetOne(int id)
        {
            return _repository.GetByIdAsNoTracking(id);
        }

        public async Task<User> Save(User user)
        {
            _repository.Add(user);

            await _uow.CommitAsync();

            return user;
        }

        public async Task<User> Update(int id, User user)
        {
            var entityExists = _repository.Any(x => x.Id.Equals(id));

            if (!entityExists) return null;

            _repository.Update(user);

            await _uow.CommitAsync();

            return _repository.GetById(id);
        }

        public async Task<User> Delete(int id)
        {
            var entityExists = _repository.Any(x => x.Id.Equals(id));

            if (!entityExists) return null;

            _repository.Delete(id);

            await _uow.CommitAsync();

            return _repository.GetById(id);
        }

        #endregion
    }
}
