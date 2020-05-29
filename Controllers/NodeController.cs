using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TreeWithReact.Models;
using TreeWithReact.Models.NodeModels;
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
        private readonly IMapper _mapper;

        public NodeController(ILogger<NodeController> logger, INodeService nodeService, IMapper mapper)
        {
            _logger = logger;
            _nodeService = nodeService;
            _mapper = mapper;

        }
        [HttpPost]
        public async Task<IActionResult> AddNode([FromBody] AddNodeModel model)
        {
            var node = await _nodeService.AddNodeAsync(model);
            var nodeModel = _mapper.Map<NodeModel>(node);
            
            return Ok(nodeModel);
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
            var response = await _nodeService.DeleteNodeAsync(model);

            return Ok();
        }
        [HttpPost("sort")]
        public async Task<IActionResult> SortNode([FromBody] SortNodeModel model)
        {
            var node = await _nodeService.SortNodeAsync(model);
            var mappedNode = _mapper.Map<NodeModel>(node);

            return Ok(mappedNode);
        }
        [HttpPost("move")]
        public async Task<IActionResult> MoveNode([FromBody] MoveElementModel model)
        {
            var response = await _nodeService.MoveNodeAsync(model);
            var mappedTree = _mapper.Map<IEnumerable<NodeModel>>(response);
            
            return Ok(mappedTree);
        }
    }
}