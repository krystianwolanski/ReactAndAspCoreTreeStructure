using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TreeWithReact.Models;
using TreeWithReact.Services;

namespace TreeWithReact.Controllers
{
    [ApiController]
    [AllowAnonymous]
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