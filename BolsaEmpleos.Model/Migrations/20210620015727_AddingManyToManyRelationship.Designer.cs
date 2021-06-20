﻿// <auto-generated />
using System;
using BolsaEmpleos.Model.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BolsaEmpleos.Model.Migrations
{
    [DbContext(typeof(BolsaEmpleosDbContext))]
    [Migration("20210620015727_AddingManyToManyRelationship")]
    partial class AddingManyToManyRelationship
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BolsaEmpleos.Model.Entities.ApplicantJob", b =>
                {
                    b.Property<int>("ApplicantId")
                        .HasColumnType("int");

                    b.Property<int>("PositionId")
                        .HasColumnType("int");

                    b.HasKey("ApplicantId", "PositionId");

                    b.HasIndex("PositionId");

                    b.ToTable("ApplicantJob");
                });

            modelBuilder.Entity("BolsaEmpleos.Model.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("BolsaEmpleos.Model.Entities.Position", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CategoryId1")
                        .HasColumnType("int");

                    b.Property<string>("Company")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ContractType")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PosterId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId1");

                    b.HasIndex("PosterId");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("BolsaEmpleos.Model.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DocumentUri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Lastname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BolsaEmpleos.Model.Entities.ApplicantJob", b =>
                {
                    b.HasOne("BolsaEmpleos.Model.Entities.User", "Applicant")
                        .WithMany("ApplicantJobs")
                        .HasForeignKey("ApplicantId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BolsaEmpleos.Model.Entities.Position", "Position")
                        .WithMany("ApplicantJobs")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("BolsaEmpleos.Model.Entities.Position", b =>
                {
                    b.HasOne("BolsaEmpleos.Model.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId1")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("BolsaEmpleos.Model.Entities.User", "Poster")
                        .WithMany()
                        .HasForeignKey("PosterId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
