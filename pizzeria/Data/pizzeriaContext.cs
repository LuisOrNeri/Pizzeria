using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pizzeria.Models;

namespace pizzeria.Data
{
    public class pizzeriaContext : DbContext
    {
        public pizzeriaContext (DbContextOptions<pizzeriaContext> options)
            : base(options)
        {
        }

        public DbSet<pizzeria.Models.Pizza> Pizza { get; set; }
    }
}
