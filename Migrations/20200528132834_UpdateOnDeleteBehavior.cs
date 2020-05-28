using Microsoft.EntityFrameworkCore.Migrations;

namespace TreeWithReact.Migrations
{
    public partial class UpdateOnDeleteBehavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Nodes_ParentNodeId",
                table: "Leaves");

            migrationBuilder.DropForeignKey(
                name: "FK_Nodes_Nodes_ParentNodeId",
                table: "Nodes");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Nodes_ParentNodeId",
                table: "Leaves",
                column: "ParentNodeId",
                principalTable: "Nodes",
                principalColumn: "NodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Nodes_Nodes_ParentNodeId",
                table: "Nodes",
                column: "ParentNodeId",
                principalTable: "Nodes",
                principalColumn: "NodeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Nodes_ParentNodeId",
                table: "Leaves");

            migrationBuilder.DropForeignKey(
                name: "FK_Nodes_Nodes_ParentNodeId",
                table: "Nodes");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Nodes_ParentNodeId",
                table: "Leaves",
                column: "ParentNodeId",
                principalTable: "Nodes",
                principalColumn: "NodeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Nodes_Nodes_ParentNodeId",
                table: "Nodes",
                column: "ParentNodeId",
                principalTable: "Nodes",
                principalColumn: "NodeId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
