using Microsoft.EntityFrameworkCore.Migrations;

namespace BolsaEmpleos.Model.Migrations
{
    public partial class AddingCompanyEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyEmail",
                table: "Positions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyEmail",
                table: "Positions");
        }
    }
}
