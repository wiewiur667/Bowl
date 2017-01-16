using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Bowl.Models.Api.Interfaces;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Bowl.Controllers.Api
{
    [Route("api/[controller]")]
    public class BowlsController : Controller
    {
        private IBowl _bowlsRepository { get; }
        public BowlsController(IBowl repository)
        {
            _bowlsRepository = repository;
        }
        //private IDietRepository _bowlRepository { get; }
        // GET: /<controller>/
        [HttpGet]
        public IActionResult Index()
        {
            var bowls = _bowlsRepository.Get();
            if (bowls != null)
            {
                return new JsonResult(bowls);
            }

            return NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult GetBowl(int id)
        {
            var bowl = _bowlsRepository.Get(id);
            if (bowl != null)
            {
                return new JsonResult(bowl);
            }

            return NotFound();
        }

        [HttpPut]
        public IActionResult PutBowl([FromBody] Models.Api.Bowl bowl)
        {
            if (ModelState.IsValid)
            {
                var b = _bowlsRepository.Save(bowl);
                if (b != null)
                {
                    return new OkObjectResult(b);
                }
            }
            else
            {
                var errors = ModelState
                .Where(x => x.Value.Errors.Count > 0)
                .Select(x => new { x.Key, x.Value.Errors })
                .ToArray();

                return new BadRequestObjectResult(errors);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var diet = _bowlsRepository.Get(id);
            if (diet == null)
            {
                return NotFound();
            }

            _bowlsRepository.Delete(id);
            return NoContent();
        }
    }
}
