using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
            return _context.Pizza.OrderByDescending(p => p.PizzaId);
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
