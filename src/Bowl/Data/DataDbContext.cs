using Microsoft.EntityFrameworkCore;

namespace Bowl.Data
{
    public class DataDbContext : DbContext
    {
        public DbSet<Models.Api.Bowl> Bowl { get; set; }
        //public DbSet<Pet> Pet { get; set; }
        //public DbSet<Diet> Diet { get; set; }
        //public DbSet<Meal> Meal { get; set; }

        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
