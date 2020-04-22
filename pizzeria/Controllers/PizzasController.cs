using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pizzeria.Data;
using pizzeria.Models;

namespace pizzeria.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PizzasController : ControllerBase
    {
        private readonly pizzeriaContext _context;
        private readonly IDataRepository<Pizza> _repo;

        public PizzasController(pizzeriaContext context, IDataRepository<Pizza> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Pizzas
        [HttpGet]
        public IEnumerable<Pizza> GetPizza()
        {
            return _context.Pizza.OrderBy(p => p.PizzaId);
        }

        // GET: api/Pizzas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPizza([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pizza = await _context.Pizza.FindAsync(id);

            if (pizza == null)
            {
                return NotFound();
            }

            return Ok(pizza);
        }

        // PUT: api/Pizzas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPizza([FromRoute] int id, [FromBody] Pizza pizza)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pizza.PizzaId)
            {
                return BadRequest();
            }

            _context.Entry(pizza).State = EntityState.Modified;

            try
            {
                _repo.Update(pizza);
                var save = await _repo.SaveAsync(pizza);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PizzaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pizzas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<IActionResult> PostPizza([FromBody] Pizza pizza)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(pizza);
            var save = await _repo.SaveAsync(pizza);

            return CreatedAtAction("GetPizza", new { id = pizza.PizzaId }, pizza);
        }

        [HttpPost("{upimage}")]
        public IActionResult Upload([FromRoute] String upimage)
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Image");
                var folderName2 = Path.Combine("uploads");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                string newPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), @"..\"));
                var newPath2 = Path.Combine(newPath, "PizzeriApp", "src", "assets", "img");
                var pathToSave2 = Path.Combine(newPath2, folderName2);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var fullPath2 = Path.Combine(pathToSave2, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    var dbPath2 = Path.Combine(folderName2, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    using (var stream2 = new FileStream(fullPath2, FileMode.Create))
                    {
                        file.CopyTo(stream2);
                    }

                    return Ok(new { dbPath, dbPath2 });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // DELETE: api/Pizzas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pizza = await _context.Pizza.FindAsync(id);
            if (pizza == null)
            {
                return NotFound();
            }

            _repo.Delete(pizza);
            var save = await _repo.SaveAsync(pizza);

            return Ok(pizza);
        }

        private bool PizzaExists(int id)
        {
            return _context.Pizza.Any(e => e.PizzaId == id);
        }
    }
}
