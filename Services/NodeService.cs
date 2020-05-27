using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeWithReact.Entities;
using TreeWithReact.Helpers;
using TreeWithReact.Models;

namespace TreeWithReact.Services
{
    public interface INodeService
    {
        Task<NodeModel> AddNodeAsync(AddNodeModel model);
        Task<bool> EditNodeAsync(EditNodeModel model);
        Task<bool> DeleteNodeAsync(int NodeId);
    }
    public class NodeService : INodeService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NodeService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<NodeModel> AddNodeAsync(AddNodeModel model)
        {
            var parent = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.ParentNodeId);

            Node node = new Node() { Name = model.Name, ParentNode = parent };

            await _context.Nodes.AddAsync(node);
            await _context.SaveChangesAsync();

            return _mapper.Map<NodeModel>(node);
        }

        public async Task<bool> DeleteNodeAsync(int NodeId)
        {
            var node = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == NodeId);
            _context.Remove(node);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> EditNodeAsync(EditNodeModel model)
        {
            var node = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.NodeId);

            node.Name = model.Name;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
