using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeWithReact.Entities;
using TreeWithReact.Helpers;
using TreeWithReact.Models.LeafModels;

namespace TreeWithReact.Services
{
    public interface ILeafService
    {
        Task<Leaf> AddLeafAsync(AddLeafModel model);
        Task<bool> EditLeafAsync(EditLeafModel model);
        Task<bool> DeleteLeafAsync(DeleteLeafModel model);
    }
    public class LeafService:ILeafService
    {
        private readonly DataContext _context;
        public LeafService(DataContext context)
        {
            _context = context;
        }
        public async Task<Leaf> AddLeafAsync(AddLeafModel model)
        {
            var parent = await _context.Nodes.SingleOrDefaultAsync(x => x.NodeId == model.ParentNodeId);

            if (parent == null)
                return null;

            Leaf leaf = new Leaf() { Name = model.Name, ParentNode = parent };

            parent.SubLeaves.Add(leaf);

            await _context.SaveChangesAsync();

            return leaf;
        }

        public async Task<bool> DeleteLeafAsync(DeleteLeafModel model)
        {
            var leaf = await _context.Leaves.SingleOrDefaultAsync(x => x.LeafId == model.LeafId);

            _context.Leaves.Remove(leaf);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> EditLeafAsync(EditLeafModel model)
        {
            var leaf = await _context.Leaves.SingleOrDefaultAsync(x => x.LeafId == model.LeafId);
            leaf.Name = model.Name;
            
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
