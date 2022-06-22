import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage: number;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(currentPage:number = 1) {
    this.productService.all(currentPage).subscribe(
      (res: any) => {
        this.products = res.data;
        this.lastPage = res.meta.last_page;
      }
    );
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.productService.delete(id).subscribe(
        res => {
          // this deletes users from the FE
          this.products = this.products.filter(el => el.id !== id);
        }
      )
    }
  }

}
