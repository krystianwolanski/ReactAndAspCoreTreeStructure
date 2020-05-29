using System.ComponentModel.DataAnnotations;

namespace TreeWithReact.Models.NodeModels
{
    public class EditNodeModel
    {
        [Required]
        public int NodeId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
