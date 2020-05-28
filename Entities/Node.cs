
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace TreeWithReact.Entities
{
    public class Node
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NodeId { get; private set; }
        [Required]
        public string Name { get; set; }
        public int? ParentNodeId { get; set; }
        [ForeignKey("ParentNodeId")]
        public Node ParentNode { get; set; }
        public List<Node> SubNodes { get; set; }
        public List<Leaf> SubLeaves { get; set; }
        public Node()
        {
            SubNodes = new List<Node>();
            SubLeaves = new List<Leaf>();
        }
    }
}