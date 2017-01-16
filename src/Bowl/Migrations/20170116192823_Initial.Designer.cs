using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Bowl.Data;

namespace Bowl.Migrations
{
    [DbContext(typeof(DataDbContext))]
    [Migration("20170116192823_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Bowl.Models.Api.Bowl", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Distributing");

                    b.Property<decimal>("FoodAlert");

                    b.Property<decimal>("FoodAmount");

                    b.Property<string>("FoodName");

                    b.Property<Guid>("Guid");

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.Property<bool>("Open");

                    b.HasKey("Id");

                    b.ToTable("Bowl");
                });
        }
    }
}
