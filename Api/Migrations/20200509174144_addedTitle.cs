using Microsoft.EntityFrameworkCore.Migrations;

namespace CaseMan.Migrations
{
    public partial class addedTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Summary",
                table: "Cases",
                newName: "Title");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Cases",
                newName: "Summary");
        }
    }
}
