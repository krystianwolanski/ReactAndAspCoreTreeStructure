using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TreeWithReact.Models
{
    public class MoveElementModel
    {
        [Required]
        public int ElementId { get; set; }
        [Required]
        public int ToNodeId { get; set; }
    }
}
