using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeWithReact.Entities;

namespace TreeWithReact.Helpers
{
    public class DataContext:DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
       
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server database
            options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Node>()
                .HasMany(cat => cat.SubNodes)
                .WithOne(cat => cat.ParentNode);

            modelBuilder.Entity<Node>()
                .HasMany(cat => cat.SubLeaves)
                .WithOne(cat => cat.ParentNode);


            //modelBuilder.Seed(); // I will have to work with it. The method is in the ModelBuilderExtension class
        }

        public DbSet<Node> Nodes { get; set; }
        public DbSet<Leaf> Leaves { get; set; }
    }
}
