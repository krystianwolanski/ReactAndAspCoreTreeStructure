using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreeWithReact.Models
{
    public class AddNodeModel
    {
        public string Name { get; set; }
        public int? ParentNodeId { get; set; }
    }
}
