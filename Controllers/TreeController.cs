using System.Collections.Generic;
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
    public class TreeController : ControllerBase
    {
        private readonly ILogger<TreeController> _logger;
        private readonly ITreeService _treeService;
        private readonly IMapper _mapper;

        public TreeController(ILogger<TreeController> logger, ITreeService treeService, IMapper mapper)
        {
            _logger = logger;
            _treeService = treeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetTree()
        {
            var tree = await _treeService.GetTreeAsync();
            var model = _mapper.Map<IEnumerable<NodeModel>>(tree);
            
            return Ok(model);
        }
       

    }
}