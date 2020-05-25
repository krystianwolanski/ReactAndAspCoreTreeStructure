using AutoMapper;
using TreeWithReact.Entities;
using TreeWithReact.Models;

namespace TreeWithReact.Helpers
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AddNodeModel, Node>();
            CreateMap<Node, NodeModel>();
      
                
        }
    }
}