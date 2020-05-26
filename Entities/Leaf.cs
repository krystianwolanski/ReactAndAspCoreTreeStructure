using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TreeWithReact.Entities
{
    public class Leaf
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LeafId { get; set; }
        public string Name { get; set; }
        public int? ParentNodeId { get; set; }
        [ForeignKey("ParentNodeId")]
        public Node ParentNode { get; set; }
    }
}
