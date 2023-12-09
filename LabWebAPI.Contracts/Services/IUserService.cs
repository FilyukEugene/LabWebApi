using LabWebAPI.Contracts.APImodels;
using LabWebAPI.Contracts.Exceptions;
using LabWebAPI.Contracts.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.Services
{
    public interface IUserService
    {
        Task UploadAvatar(IFormFile avatar, string userId);
        Task<DownloadFile> GetUserImageAsync(string userId);
    }
}
