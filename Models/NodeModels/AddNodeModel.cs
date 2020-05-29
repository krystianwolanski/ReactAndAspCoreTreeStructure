
using System.ComponentModel.DataAnnotations;

namespace TreeWithReact.Models.NodeModels
{
    public class AddNodeModel
    {
        [Required]
        public string Name { get; set; }
        public int? ParentNodeId { get; set; }
    }
}
