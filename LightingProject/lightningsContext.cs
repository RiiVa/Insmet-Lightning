using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace LightingProject
{
    public partial class lightningsContext : DbContext
    {
        public lightningsContext()
        {
        }

        public lightningsContext(DbContextOptions<lightningsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Date> Dates { get; set; }
        public virtual DbSet<Flash> Flashes { get; set; }
        public virtual DbSet<Pulse> Pulses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=10.0.4.117;port=5432;Username=riiva_server;Password=Estaciones2014;Database=lightnings");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "en_US.utf8");

            modelBuilder.Entity<Date>(entity =>
            {
                entity.ToTable("date");

                entity.HasIndex(e => e.Date1, "dates")
                    .IsUnique();

                entity.HasIndex(e => e.Date1, "index_date");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Date1).HasColumnName("date");
            });

            modelBuilder.Entity<Flash>(entity =>
            {
                entity.ToTable("flash");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cgmulti).HasColumnName("cgmulti");

                entity.Property(e => e.Icheight).HasColumnName("icheight");

                entity.Property(e => e.Icmulti).HasColumnName("icmulti");

                entity.Property(e => e.IdDate)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_date");

                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longitude).HasColumnName("longitude");

                entity.Property(e => e.Ltype).HasColumnName("ltype");

                entity.Property(e => e.Peakcurrent).HasColumnName("peakcurrent");

                entity.Property(e => e.Sensor).HasColumnName("sensor");

                entity.HasOne(d => d.IdDateNavigation)
                    .WithMany(p => p.Flashes)
                    .HasForeignKey(d => d.IdDate)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("id_date");
            });

            modelBuilder.Entity<Pulse>(entity =>
            {
                entity.ToTable("pulse");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bearing).HasColumnName("bearing");

                entity.Property(e => e.Icheight).HasColumnName("icheight");

                entity.Property(e => e.IdDate)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_date");

                entity.Property(e => e.IdFlash)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_flash");

                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longitude).HasColumnName("longitude");

                entity.Property(e => e.Major).HasColumnName("major");

                entity.Property(e => e.Minor).HasColumnName("minor");

                entity.Property(e => e.Peakcurrent).HasColumnName("peakcurrent");

                entity.Property(e => e.Ptype).HasColumnName("ptype");

                entity.Property(e => e.Sensor).HasColumnName("sensor");

                entity.HasOne(d => d.IdDateNavigation)
                    .WithMany(p => p.Pulses)
                    .HasForeignKey(d => d.IdDate)
                    .HasConstraintName("id_date");

                entity.HasOne(d => d.IdFlashNavigation)
                    .WithMany(p => p.Pulses)
                    .HasForeignKey(d => d.IdFlash)
                    .HasConstraintName("id_flash");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
