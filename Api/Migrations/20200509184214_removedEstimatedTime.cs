using Microsoft.EntityFrameworkCore.Migrations;

namespace CaseMan.Migrations
{
    public partial class removedEstimatedTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedTime",
                table: "Cases");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EstimatedTime",
                table: "Cases",
                nullable: false,
                defaultValue: 0);
        }
    }
}
