using System.ComponentModel.DataAnnotations;

namespace TreeWithReact.Models.LeafModels
{
    public class DeleteLeafModel
    {
        [Required]
        public int LeafId { get; set; }
    }
}
