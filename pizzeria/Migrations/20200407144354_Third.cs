using Microsoft.EntityFrameworkCore.Migrations;

namespace pizzeria.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Imagen",
                table: "Pizza");

            migrationBuilder.DropColumn(
                name: "Ingredientes",
                table: "Pizza");

            migrationBuilder.DropColumn(
                name: "Nombre",
                table: "Pizza");

            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Pizza");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Pizza",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ingredients",
                table: "Pizza",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Pizza",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "Pizza",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Pizza");

            migrationBuilder.DropColumn(
                name: "Ingredients",
                table: "Pizza");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Pizza");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Pizza");

            migrationBuilder.AddColumn<string>(
                name: "Imagen",
                table: "Pizza",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ingredientes",
                table: "Pizza",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Nombre",
                table: "Pizza",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "Precio",
                table: "Pizza",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
