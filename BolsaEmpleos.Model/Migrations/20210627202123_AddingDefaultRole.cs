using Microsoft.EntityFrameworkCore.Migrations;

namespace BolsaEmpleos.Model.Migrations
{
    public partial class AddingDefaultRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicantJob_Users_ApplicantId",
                table: "ApplicantJob");

            migrationBuilder.DropForeignKey(
                name: "FK_ApplicantJob_Positions_PositionId",
                table: "ApplicantJob");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicantJob",
                table: "ApplicantJob");

            migrationBuilder.RenameTable(
                name: "ApplicantJob",
                newName: "ApplicantJobs");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicantJob_PositionId",
                table: "ApplicantJobs",
                newName: "IX_ApplicantJobs_PositionId");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicantJobs",
                table: "ApplicantJobs",
                columns: new[] { "ApplicantId", "PositionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicantJobs_Users_ApplicantId",
                table: "ApplicantJobs",
                column: "ApplicantId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicantJobs_Positions_PositionId",
                table: "ApplicantJobs",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicantJobs_Users_ApplicantId",
                table: "ApplicantJobs");

            migrationBuilder.DropForeignKey(
                name: "FK_ApplicantJobs_Positions_PositionId",
                table: "ApplicantJobs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicantJobs",
                table: "ApplicantJobs");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "ApplicantJobs",
                newName: "ApplicantJob");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicantJobs_PositionId",
                table: "ApplicantJob",
                newName: "IX_ApplicantJob_PositionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicantJob",
                table: "ApplicantJob",
                columns: new[] { "ApplicantId", "PositionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicantJob_Users_ApplicantId",
                table: "ApplicantJob",
                column: "ApplicantId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicantJob_Positions_PositionId",
                table: "ApplicantJob",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
