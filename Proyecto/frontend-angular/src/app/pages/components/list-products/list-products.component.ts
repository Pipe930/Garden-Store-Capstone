import { Component, ElementRef, inject, OnInit, signal, Signal, viewChild } from '@angular/core';
import { CardComponent } from '@shared/card/card.component';
import { Product } from '@pages/interfaces/product';
import { Category } from '@pages/interfaces/category';
import { ProductsService } from '@pages/services/products.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {

  private readonly _productsService = inject(ProductsService);
  private readonly _viewportScroller = inject(ViewportScroller);

  public listProducts = signal<Array<Product>>([]);
  public listCategories = signal<Array<Category>>([]);
  public currentPage = signal<number>(1);
  public isLoading = signal<boolean>(false);

  public nameProduct: Signal<ElementRef> = viewChild.required("searchNameProduct");
  public selectCategory: Signal<ElementRef> = viewChild.required("selectIdCategory");

  ngOnInit(): void {

    this._productsService.getAllCategories().subscribe(result => {
      this.listCategories.set(result.data);
    })

    this._productsService.getAllProducts();
    this._productsService.products$.subscribe(result => {
      this.listProducts.set(result);
      this.isLoading.set(true);
    })
  }

  public nextPage():void{

    this.currentPage.update(value => value + 1);
    this._productsService.getProductsPage(this.currentPage());
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  public previousPage():void{

    if(this.currentPage() > 1) this.currentPage.update(value => value - 1);
    this._productsService.getProductsPage(this.currentPage());
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  public searchProduct():void {

    const name_product = this.nameProduct().nativeElement.value;
    const id_category = this.selectCategory().nativeElement.value;

    this._productsService.searchProduct(name_product, id_category);
  }

  get getService(){
    return this._productsService;
  }
}
