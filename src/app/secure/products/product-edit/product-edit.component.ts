import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: '',
    });

    this.router.params.subscribe(
      params  => {
        this.productService.get(params['id']).subscribe(
          (res: any) => {
            this.product = res.data;
            this.form.patchValue(this.product);
          }
        )
      }
    )
  }

  submit() {
    const data = this.form.getRawValue();

    this.productService.update(this.product.id, data).subscribe(
(res: any) => {
        this.route.navigate(['/products']);
      }
    )
  }

}
