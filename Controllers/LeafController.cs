using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TreeWithReact.Models.LeafModels;
using TreeWithReact.Services;

namespace TreeWithReact.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("[controller]")]
    public class LeafController : ControllerBase
    {
        private readonly ILogger<LeafController> _logger;
        private readonly ILeafService _leafService;
        private readonly IMapper _mapper;

        public LeafController(ILogger<LeafController> logger, ILeafService leafService, IMapper mapper)
        {
            _logger = logger;
            _leafService = leafService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddLeaf([FromBody] AddLeafModel model)
        {
            var leaf = await _leafService.AddLeafAsync(model);

            if (leaf == null)
                return NotFound();

            var mapperModel = _mapper.Map<LeafModel>(leaf);
            return Ok(mapperModel);
        }
        [HttpPut]
        public async Task<IActionResult> EditLeaf([FromBody] EditLeafModel model)
        {
            var response = await _leafService.EditLeafAsync(model);

            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteLeaf([FromBody] DeleteLeafModel model)
        {
            var response = await _leafService.DeleteLeafAsync(model);

            return Ok();
        }
    }
}