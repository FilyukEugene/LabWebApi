using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.DTO.Comment
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }

    }
}
