using Microsoft.EntityFrameworkCore.Migrations;

namespace BolsaEmpleos.Model.Migrations
{
    public partial class RefactoringUserClaimsProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentUri",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "DocumentUrl",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ObjectIdentifier",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ObjectIdentifier",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "DocumentUri",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
