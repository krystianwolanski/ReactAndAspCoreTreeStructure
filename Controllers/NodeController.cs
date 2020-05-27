using System;
using System.Collections.Generic;
using System.Linq;
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
    public class NodeController : ControllerBase
    {
        private readonly ILogger<NodeController> _logger;
        private readonly INodeService _nodeService;

        public NodeController(ILogger<NodeController> logger, INodeService nodeService)
        {
            _logger = logger;
            _nodeService = nodeService;

        }
        [HttpPost]
        public async Task<IActionResult> AddNode([FromBody] AddNodeModel model)
        {
            var node = await _nodeService.AddNodeAsync(model);

            return Ok(node);
        }

        [HttpPut]
        public async Task<IActionResult> EditNode([FromBody] EditNodeModel model)
        {
            var response = await _nodeService.EditNodeAsync(model);

            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteNode([FromBody]DeleteNodeModel model)
        {
            var response = await _nodeService.DeleteNodeAsync(model.NodeId);

            return Ok();
        }
    }
}