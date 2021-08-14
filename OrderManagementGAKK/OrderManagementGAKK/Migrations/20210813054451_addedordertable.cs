using Microsoft.EntityFrameworkCore.Migrations;

namespace OrderManagementGAKK.Migrations
{
    public partial class addedordertable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orderDetail_orderMaster_OrderMasterId",
                table: "orderDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_products",
                table: "products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orderMaster",
                table: "orderMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orderDetail",
                table: "orderDetail");

            migrationBuilder.RenameTable(
                name: "products",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "orderMaster",
                newName: "OrderMaster");

            migrationBuilder.RenameTable(
                name: "orderDetail",
                newName: "OrderDetail");

            migrationBuilder.RenameIndex(
                name: "IX_orderDetail_OrderMasterId",
                table: "OrderDetail",
                newName: "IX_OrderDetail_OrderMasterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderMaster",
                table: "OrderMaster",
                column: "OrderMasterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail",
                column: "OrderDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_OrderMaster_OrderMasterId",
                table: "OrderDetail",
                column: "OrderMasterId",
                principalTable: "OrderMaster",
                principalColumn: "OrderMasterId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_OrderMaster_OrderMasterId",
                table: "OrderDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderMaster",
                table: "OrderMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "products");

            migrationBuilder.RenameTable(
                name: "OrderMaster",
                newName: "orderMaster");

            migrationBuilder.RenameTable(
                name: "OrderDetail",
                newName: "orderDetail");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_OrderMasterId",
                table: "orderDetail",
                newName: "IX_orderDetail_OrderMasterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_products",
                table: "products",
                column: "ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orderMaster",
                table: "orderMaster",
                column: "OrderMasterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orderDetail",
                table: "orderDetail",
                column: "OrderDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_orderDetail_orderMaster_OrderMasterId",
                table: "orderDetail",
                column: "OrderMasterId",
                principalTable: "orderMaster",
                principalColumn: "OrderMasterId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
