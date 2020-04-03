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
        public string Nombre { get; set; }

        public string Imagen { get; set; }

        [Required]
        public float Precio { get; set; }

        [Required]
        public string Ingredientes { get; set; }
    }
}
