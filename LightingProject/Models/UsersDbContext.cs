using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace LightingProject.Models
{
    public partial class UsersDbContext : DbContext
    {
        public UsersDbContext()
        {
        }

        public UsersDbContext(DbContextOptions<UsersDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Conection> Conections { get; set; }
        public virtual DbSet<FormHistory> FormHistories { get; set; }
        public virtual DbSet<History> Histories { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<WorkGroup> WorkGroups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseNpgsql("Server=10.0.4.117;Database=users;Uid=riiva_server;Pwd=Estaciones2014;");
                optionsBuilder.UseNpgsql("Host=10.0.4.117;port=5432;Username=riiva_server;Password=Estaciones2014;Database=accounts");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "en_US.utf8");

            modelBuilder.Entity<Conection>(entity =>
            {
                entity.ToTable("Conection");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Ip)
                    .HasMaxLength(255)
                    .HasColumnName("ip");

                entity.Property(e => e.Time)
                    .HasColumnType("time without time zone")
                    .HasColumnName("time");
            });

            modelBuilder.Entity<FormHistory>(entity =>
            {
                entity.ToTable("FormHistory");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cg).HasColumnName("cg");

                entity.Property(e => e.End)
                    .HasColumnType("date")
                    .HasColumnName("end");

                entity.Property(e => e.Flash).HasColumnName("flash");

                entity.Property(e => e.Ic).HasColumnName("ic");

                entity.Property(e => e.Init)
                    .HasColumnType("date")
                    .HasColumnName("init");

                entity.Property(e => e.PeakEnd).HasColumnName("peakEnd");

                entity.Property(e => e.PeakInit).HasColumnName("peakInit");

                entity.Property(e => e.Pulse).HasColumnName("pulse");
            });

            modelBuilder.Entity<History>(entity =>
            {
                entity.ToTable("History");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Connections)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("connections");

                entity.Property(e => e.FormsHistory)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("forms_history");

                entity.HasOne(d => d.ConnectionsNavigation)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.Connections)
                    .HasConstraintName("id_conections");

                entity.HasOne(d => d.FormsHistoryNavigation)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.FormsHistory)
                    .HasConstraintName("id_forms");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Accounts");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Firstname)
                    .HasMaxLength(255)
                    .HasColumnName("firstname");

                entity.Property(e => e.IdHistory)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_history");

                entity.Property(e => e.IdWork)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_work");

                entity.Property(e => e.InitialCreate)
                    .HasColumnType("date")
                    .HasColumnName("initial_create");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(255)
                    .HasColumnName("lastname");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .HasColumnName("username");
                
                entity.Property(e => e.Token)
                    .HasMaxLength(32)
                    .HasColumnName("token");
                
                entity.HasOne(d => d.IdHistoryNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdHistory)
                    .HasConstraintName("id_history");

                entity.HasOne(d => d.IdWorkNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdWork)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("id_work");
            });

            modelBuilder.Entity<WorkGroup>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Token)
                    .HasMaxLength(32)
                    .HasColumnName("token");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("username");

                entity.Property(e => e.Vip).HasColumnName("vip");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
