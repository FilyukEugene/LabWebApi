using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.DTO.Comment;

namespace LabWebAPI.Contracts.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDTO>> GetAllCommentsAsync(int productId);
        Task<CreateCommentDTO> AddCommentAsync(CreateCommentDTO comment);
        Task DeleteCommentAsync(int commentId);
    }
}
