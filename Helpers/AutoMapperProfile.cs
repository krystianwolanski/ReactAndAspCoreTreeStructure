using AutoMapper;
using System.Collections.Generic;
using TreeWithReact.Entities;
using TreeWithReact.Models;

namespace TreeWithReact.Helpers
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AddNodeModel, Node>();
            
            CreateMap<Leaf, LeafModel>();
            CreateMap<Node, NodeModel>();
                
      
                
        }
    }
}