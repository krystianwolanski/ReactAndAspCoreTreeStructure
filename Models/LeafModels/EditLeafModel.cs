using System.ComponentModel.DataAnnotations;

namespace TreeWithReact.Models.LeafModels
{
    public class EditLeafModel
    {
        [Required]
        public int LeafId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}

