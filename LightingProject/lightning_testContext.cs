using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace LightingProject
{
    public partial class lightning_testContext : DbContext
    {
        public lightning_testContext()
        {
        }

        public lightning_testContext(DbContextOptions<lightning_testContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Lightning> Lightnings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=10.0.4.114;port=5432;Username=postgres;Password=123456;Database=lightning_test");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Spanish_Spain.1252");

            modelBuilder.Entity<Lightning>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("lightning");

                entity.Property(e => e.Cgmultiplicity).HasColumnName("cgmultiplicity");

                entity.Property(e => e.Icheight).HasColumnName("icheight");

                entity.Property(e => e.Icmultiplicity).HasColumnName("icmultiplicity");

                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longitude).HasColumnName("longitude");

                entity.Property(e => e.Ltime).HasColumnName("ltime");

                entity.Property(e => e.Ltype).HasColumnName("ltype");

                entity.Property(e => e.Numsensors).HasColumnName("numsensors");

                entity.Property(e => e.Peakcurrent).HasColumnName("peakcurrent");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
