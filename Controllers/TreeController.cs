using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TreeWithReact.Models;
using TreeWithReact.Services;

namespace TreeWithReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TreeController : ControllerBase
    {
        private readonly ILogger<TreeController> _logger;
        private readonly ITreeService _treeService;

        public TreeController(ILogger<TreeController> logger, ITreeService treeService)
        {
            _logger = logger;
            _treeService = treeService;

        }

        [HttpGet]
        public async Task<IActionResult> GetTree()
        {
            var tree = await _treeService.GetTreeAsync();
            
            return Ok(tree);
        }


        [HttpPost("node")]
        public async Task<IActionResult> AddNode([FromBody] AddNodeModel model)
        {
            var node = await _treeService.AddNodeAsync(model);
       
            return Ok(node);
        }

        [HttpPut("node")]
        public async Task<IActionResult> EditNode([FromBody] EditNodeModel model)
        {
            var answer = await _treeService.EditNodeAsync(model);

            return Ok();
        }

        [HttpPost("leaf")]
        public async Task<IActionResult> AddLeaf([FromBody] AddLeafModel model)
        {
            var result = await _treeService.AddLeafAsync(model);
            
            if (!result)
                return NotFound();

            return Ok();
        }
    }
}