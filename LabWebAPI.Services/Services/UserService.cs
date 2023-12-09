using AutoMapper;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Exceptions;
using LabWebAPI.Contracts.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using LabWebAPI.Contracts.APImodels;
using LabWebAPI.Contracts.Helpers;

namespace LabWebAPI.Services.Services
{
    public class UserService: IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly IOptions<ImageSettings> _imageSettings;
        public UserService(UserManager<User> userManager,
        IMapper mapper,
        IFileService fileService,
        IOptions<ImageSettings> imageSettings)
        {
            _userManager = userManager;
            _mapper = mapper;
            _fileService = fileService;
            _imageSettings = imageSettings;
        }
        public async Task UploadAvatar(IFormFile avatar, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            string newPath = await _fileService.AddFileAsync(avatar.OpenReadStream(), _imageSettings.Value.Path,
           avatar.FileName);
            if (user.ImageAvatarUrl != null)
            {
                await _fileService.DeleteFileAsync(user.ImageAvatarUrl);
            }
            user.ImageAvatarUrl = newPath;
            await _userManager.UpdateAsync(user);
        }
        public async Task<DownloadFile> GetUserImageAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            _ = user.ImageAvatarUrl ?? throw new NotFoundException("Image not found.");
            var file = await _fileService.GetFileAsync(user.ImageAvatarUrl);
            return file;
        }

    }
}
