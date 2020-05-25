using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeWithReact.Entities;
using TreeWithReact.Helpers;
using TreeWithReact.Models;

namespace TreeWithReact.Services
{
    public interface ITreeService
    {
        Task<IEnumerable<NodeModel>> GetTreeAsync();
        Task<bool> AddNodeAsync(AddNodeModel model);
        //Task<bool> DeleteTreeAsync();
    }
    public class TreeService : ITreeService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TreeService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> AddNodeAsync(AddNodeModel model)
        {
            var parent = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.ParentNodeId);

            Node node = new Node() { Name = model.Name, ParentNode = parent };
            
            await _context.Nodes.AddAsync(node);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<IEnumerable<NodeModel>> GetTreeAsync()
        {
            var tree = await _context.Nodes.ToListAsync();
            
            return _mapper.Map<IEnumerable<NodeModel>>(tree);
        }
    }
}
