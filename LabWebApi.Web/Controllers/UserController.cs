using LabWebAPI.Contracts.Data;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Services.Services;
using Microsoft.AspNetCore.Mvc;
using LabWebAPI.Contracts.DTO.User;
using System.Security.Claims;
using LabWebAPI.Contracts.Services;

namespace LabWebApi.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private string UserId => User.FindFirst(ClaimTypes.NameIdentifier).Value;
        private IRepository<User> _userRepository;
        private IUserService _userService;

        public UserController(IRepository<User> userRepository, IUserService userService)
        {
            _userService = userService;
            _userRepository = userRepository;
        }
        [HttpPost]
        public async Task<IActionResult> AddUser(User user)
        {
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("avatar")]
        public async Task<IActionResult> UploadAvatar([FromForm] UserUploadImageDTO file)
        {
            await _userService.UploadAvatar(file.Image, UserId);
            return Ok();
        }
        [HttpGet]
        [Route("avatar")]
        public async Task<FileResult> GetImageAsync()
        {
            var file = await _userService.GetUserImageAsync(UserId);
            return File(file.Content, file.ContentType, file.Name);
        }

    }
}
