using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeWithReact.Entities;
using TreeWithReact.Helpers;
using TreeWithReact.Models.NodeModels;

namespace TreeWithReact.Services
{
    public interface INodeService
    {
        Task<Node> AddNodeAsync(AddNodeModel model);
        Task<bool> EditNodeAsync(EditNodeModel model);
        Task<bool> DeleteNodeAsync(DeleteNodeModel model);
    }
    public class NodeService : INodeService
    {
        private readonly DataContext _context;

        public NodeService(DataContext context)
        {
            _context = context;
        }
        public async Task<Node> AddNodeAsync(AddNodeModel model)
        {
            var parent = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.ParentNodeId);

            Node node = new Node() { Name = model.Name, ParentNode = parent };

            await _context.Nodes.AddAsync(node);
            await _context.SaveChangesAsync();

            return node;
        }

        public async Task<bool> DeleteNodeAsync(DeleteNodeModel model)
        {
            var node = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.NodeId);
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
