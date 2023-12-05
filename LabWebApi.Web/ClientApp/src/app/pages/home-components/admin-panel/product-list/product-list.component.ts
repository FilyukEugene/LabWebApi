import { Component, OnInit } from '@angular/core';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
import { UserInfo } from 'src/app/core/models/admin/UserInfo';
import { ProductInfo } from 'src/app/core/models/products/ProductInfo';
import { ProductService } from 'src/app/core/services/Product.service';
import { AlertService } from 'src/app/core/services/Alert.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from 'src/app/pages/home-components/admin-panel/edit-product-dialog/edit-product-dialog.component';
import { DetailProductDialogComponent } from 'src/app/pages/home-components/admin-panel/detail-product-dialog/detail-product-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: ProductInfo[];

  constructor(private productService: ProductService, private alertService: AlertService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.productService.getProducts().subscribe((data: ProductInfo[]) => this.products =
      data);
  }

  isAdminRole(user: UserInfo): boolean {
    return user.role == AuthorizationRoles.Admin;
  }

  async editProduct(product: ProductInfo) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: { ...product }
    });
    dialogRef.afterClosed().subscribe((result: ProductInfo) => {;
      if (result) {
        console.log(result);
        console.log(this.products);
        this.productService.editProduct(result).subscribe((data: any) => {
          let modelIndex = this.products.findIndex((x: any) => x.id == data.id);
          if (modelIndex !== -1) {
            this.products.splice(modelIndex, 1, data);
            this.products = [...this.products];
          } else {
            this.alertService.errorAlert("Update Product", "Failed!");
          }
        });
      }
    });
  }

  async deleteProduct(productId: any) {
    const confirmed = await this.alertService.okCancalAlert(`Do you really want 
    to delete this product?`);
    if (confirmed) {
      this.productService.deleteProduct(productId).subscribe(() => {
        const newList = this.products.filter(item => item.id == productId);
        this.products = newList;
      });
    }
  }

  async viewProduct(product: ProductInfo): Promise<void> {
    const dialogRef = this.dialog.open(DetailProductDialogComponent, {
      data: { ...product }
    });
  
    // You can perform additional logic after the dialog is closed if needed
    dialogRef.afterClosed().subscribe((result: any) => {
      // Add any logic here if necessary
    });
  }
}
