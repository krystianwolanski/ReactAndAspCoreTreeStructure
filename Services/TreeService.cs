using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
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
        Task<NodeModel> AddNodeAsync(AddNodeModel model);
        Task<bool> AddLeafAsync(AddLeafModel model);
        Task<bool> EditNodeAsync(EditNodeModel model);
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

        public async Task<bool> AddLeafAsync(AddLeafModel model)
        {
            var parent = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.ParentNodeId);

            if (parent == null)
                return false;

            Leaf leaf = new Leaf() { Name = model.Name, ParentNode = parent };

            parent.SubLeaves.Add(leaf);
           
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<NodeModel> AddNodeAsync(AddNodeModel model)
        {
            var parent = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.ParentNodeId);

            Node node = new Node() { Name = model.Name, ParentNode = parent };
            
            await _context.Nodes.AddAsync(node);
            await _context.SaveChangesAsync();
            
            return _mapper.Map<NodeModel>(node);
        }

        public async Task<bool> EditNodeAsync(EditNodeModel model)
        {
            var node = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.NodeId);

            node.Name = model.Name;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<NodeModel>> GetTreeAsync()
        {
            var nodes = await _context.Nodes.Include(x => x.SubLeaves).ToListAsync();
            var notDuplicateNodes = nodes.Where(x => x.ParentNode == null);
             
            return _mapper.Map<IEnumerable<NodeModel>>(notDuplicateNodes);
        }
    }
}
