using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Data;
using LabWebAPI.Contracts.Services;
using LabWebAPI.Contracts.DTO.Comment;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using AutoMapper;

namespace LabWebAPI.Services.Services
{
    public class CommentService : ICommentService
    {
        private protected readonly IMapper _mapper;
        private readonly IRepository<Comment> _commentRepository;
        public CommentService(IRepository<Comment> commentRepository, IMapper mapper)
        {
            _mapper = mapper;
            _commentRepository = commentRepository;
        }
        public async Task<IEnumerable<CommentDTO>> GetAllCommentsAsync(int productId)
        {

            var comments = _commentRepository.Query()
                .Where(x => x.ProductId == productId)
                .ToList();

            var commentDTOs = _mapper.Map<IEnumerable<CommentDTO>>(comments);
            return commentDTOs;
        }

        public async Task<CreateCommentDTO> AddCommentAsync(CreateCommentDTO comment)
        {
            var commentEntity = _mapper.Map<Comment>(comment);

            var result = await _commentRepository.AddAsync(commentEntity);
            await _commentRepository.SaveChangesAsync();

            var response = _mapper.Map<CreateCommentDTO>(result);
            return response;
        }
        public async Task DeleteCommentAsync(int commentId)
        {
            var comment = await _commentRepository.GetByIdAsync(commentId);
            if (comment != null)
            {
                await _commentRepository.DeleteAsync(comment);
                await _commentRepository.SaveChangesAsync();
            }
        }
    }
}