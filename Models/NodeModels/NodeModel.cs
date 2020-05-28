using System.Collections.Generic;
using TreeWithReact.Models.LeafModels;

namespace TreeWithReact.Models.NodeModels
{
    public class NodeModel
    {
        public int NodeId { get; private set; }
        public string Name { get; set; }
        public List<NodeModel> SubNodes { get; set; }
        public List<LeafModel> SubLeaves { get; set; }
    }
}
