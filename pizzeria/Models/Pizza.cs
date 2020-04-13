using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pizzeria.Models
{
    public class Pizza
    {

        [Key]
        public int PizzaId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Image { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Ingredients { get; set; }
    }
}
