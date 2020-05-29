using System.ComponentModel.DataAnnotations;

namespace TreeWithReact.Models.NodeModels
{
    public class DeleteNodeModel
    {
        [Required]
        public int NodeId { get; set; }
    }
}
