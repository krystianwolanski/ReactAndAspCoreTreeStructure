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
using TreeWithReact.Models.LeafModels;
using TreeWithReact.Models.NodeModels;

namespace TreeWithReact.Services
{
    public interface ITreeService
    {
        Task<IEnumerable<Node>> GetTreeAsync();
        
        //Task<bool> DeleteTreeAsync();
    }
    public class TreeService : ITreeService
    {
        private readonly DataContext _context;

        public TreeService(DataContext context, IMapper mapper)
        {
            _context = context;
        }

        public async Task<IEnumerable<Node>> GetTreeAsync()
        {
            var nodes = await _context.Nodes.Include(x => x.SubLeaves).ToListAsync();
            var notDuplicateNodes = nodes.Where(x => x.ParentNode == null);
             
            return notDuplicateNodes;
        }
    }
}
