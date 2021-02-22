//using System;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata;

//#nullable disable

//namespace LightingProject
//{
//    public partial class lightning_testContext : DbContext
//    {
//        public lightning_testContext()
//        {
//        }

//        public lightning_testContext(DbContextOptions<lightning_testContext> options)
//            : base(options)
//        {
//        }

//        public virtual DbSet<Lightning> Lightnings { get; set; }
//        public virtual DbSet<Pulse> Pulses { get; set; }
//        public virtual DbSet<Date> Dates { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseNpgsql("Host=10.0.4.117;port=5432;Username=postgres;Password=123456;Database=lightnings");
//            }
//        }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.HasAnnotation("Relational:Collation", "Spanish_Spain.1252");

//            modelBuilder.Entity<Date>(entity =>
//            {
                

//                entity.ToTable("date");

//                entity.HasKey(e => e.id);
//                entity.Property(e => e.Ltime).HasColumnName("date");


//            });



//            modelBuilder.Entity<Lightning>(entity =>
//            {
                

//                entity.ToTable("flash");

//                entity.HasKey(e => e.id);

//                entity.Property<int>("id_date");

//                entity.Property(e => e.Cgmultiplicity).HasColumnName("cgmulti");

//                entity.Property(e => e.Icheight).HasColumnName("icheight");

//                entity.Property(e => e.Icmultiplicity).HasColumnName("icmulti");

//                entity.Property(e => e.Latitude).HasColumnName("latitude");

//                entity.Property(e => e.Longitude).HasColumnName("longitude");

//                entity.Property(e => e.Ltype).HasColumnName("ltype");

//                entity.Property(e => e.Numsensors).HasColumnName("sensor");

//                entity.Property(e => e.Peakcurrent).HasColumnName("peakcurrent");


//            });

//            modelBuilder.Entity<Pulse>(entity =>
//            {


//                entity.ToTable("pulse");

//                entity.HasKey(e => e.id);

//                entity.Property<int>("id_date");

//                entity.Property<int>("id_flash");



//                entity.Property(e => e.Icheight).HasColumnName("icheight");



//                entity.Property(e => e.Latitude).HasColumnName("latitude");

//                entity.Property(e => e.Longitude).HasColumnName("longitude");



//                entity.Property(e => e.Ltype).HasColumnName("ltype");

//                entity.Property(e => e.Numsensors).HasColumnName("sensor");

//                entity.Property(e => e.Peakcurrent).HasColumnName("peakcurrent");

//                entity.Property(e => e.Major).HasColumnName("major");

//                entity.Property(e => e.Minor).HasColumnName("minor");

//                entity.Property(e => e.Bearing).HasColumnName("bearing");


//            });



//            OnModelCreatingPartial(modelBuilder);
//        }

//        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
//    }
//}
