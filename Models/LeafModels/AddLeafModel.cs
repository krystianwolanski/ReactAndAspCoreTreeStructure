using System.ComponentModel.DataAnnotations;

namespace TreeWithReact.Models.LeafModels
{
    public class AddLeafModel
    {
        [Required]
        public string Name { get; set; }
        public int? ParentNodeId { get; set; }
    }
}
