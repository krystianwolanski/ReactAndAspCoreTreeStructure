using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeWithReact.Entities;

namespace TreeWithReact.Models
{
    public class NodeModel
    {
        public string Name { get; set; }
        public List<NodeModel> SubNodes { get; set; }
    }
}
