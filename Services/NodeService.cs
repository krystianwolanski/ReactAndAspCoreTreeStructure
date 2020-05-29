using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeWithReact.Entities;
using TreeWithReact.Helpers;
using TreeWithReact.Models;
using TreeWithReact.Models.NodeModels;

namespace TreeWithReact.Services
{
    public interface INodeService
    {
        Task<Node> AddNodeAsync(AddNodeModel model);
        Task<bool> EditNodeAsync(EditNodeModel model);
        Task<bool> DeleteNodeAsync(DeleteNodeModel model);
        Task<Node> SortNodeAsync(SortNodeModel model);
        Task<IEnumerable<Node>> MoveNodeAsync(MoveElementModel model);
    }
    public class NodeService : INodeService
    {
        private readonly DataContext _context;
        private readonly ITreeService _treeService;

        public NodeService(DataContext context, ITreeService treeService)
        {
            _context = context;
            _treeService = treeService;
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

        public async Task<IEnumerable<Node>> MoveNodeAsync(MoveElementModel model)
        {
            var node = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.ElementId);

            node.ParentNodeId = model.ToNodeId;
            await _context.SaveChangesAsync();
                 
            var tree = await _treeService.GetTreeAsync();

            return tree;
        }

        public async Task<Node> SortNodeAsync(SortNodeModel model)
        {
            var node = await _context.Nodes.Include(x => x.SubNodes).Include(x => x.SubLeaves).SingleOrDefaultAsync(x => x.NodeId == model.NodeId);
            node.SubNodes.OrderBy(x => x.Name);
            node.SubLeaves.OrderByDescending(x => x.Name);

            await _context.SaveChangesAsync();
            return node;

        }
    }
}
