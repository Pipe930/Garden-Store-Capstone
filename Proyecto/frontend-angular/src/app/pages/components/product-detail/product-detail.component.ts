import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { Product, productJson } from '@pages/interfaces/product';
import { ProductsService } from '@pages/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';
import { AlertService } from '@core/services/alert.service';
import { DecimalPipe, TitleCasePipe, ViewportScroller } from '@angular/common';
import { register } from 'swiper/element';
import { CartService } from '@pages/services/cart.service';
import { environment } from '@env/environment.development';
import { CardComponent } from '@shared/card/card.component';
import { ReviewComponent } from '@shared/review/review.component';
import { RatingStartsComponent } from '@shared/rating-starts/rating-starts.component';
import { catchError, EMPTY } from 'rxjs';

register();

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CardComponent, DecimalPipe, ReviewComponent, TitleCasePipe, RatingStartsComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  private readonly _productsService = inject(ProductsService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _cartService = inject(CartService);
  private readonly _router = inject(Router);
  private readonly _sessionService = inject(SessionService);
  private readonly _alertService = inject(AlertService);
  private readonly _viewportScroller = inject(ViewportScroller);

  public swiperElement = viewChild.required<ElementRef>("swiper");

  public urlImage = signal<string>("");
  public product = signal<Product>(productJson);
  public productList = signal<Product[]>([]);
  public quantity = signal<number>(1);
  private slug = this._activatedRoute.snapshot.params["slug"];

  ngOnInit(): void {

    this._viewportScroller.scrollToPosition([0, 0]);
    this._productsService.getProduct(this.slug).subscribe(result => {
      this.product.set(result.data);
      this.loadImages(result.data);

      this._productsService.getProductsFilterCategory(result.data.category.idCategory).subscribe(result => {
        this.productList.set(result.data);
      })
    })
  }

  public nextSwiper():void{
    const swiperEl = this.swiperElement().nativeElement;
    swiperEl.swiper.slideNext();
  }

  public prevSwiper():void {
    const swiperEl = this.swiperElement().nativeElement;
    swiperEl.swiper.slidePrev();
  }

  public sumQuantity():void {

    if (this.product().stock > this.quantity()) {
      this.quantity.update(value => value + 1);
    }
  }

  public subQuantity():void {
    if (1 < this.quantity()) {
      this.quantity.update(value => value - 1);
    }
  }

  public eventProductGet(productGet: Product):void {

    this.quantity.set(1);
    this.product.set(productGet);
    this.loadImages(productGet);
  }

  public addCart(idProduct: number):void {

    if(!this._sessionService.validSession()){

      this._alertService.info("Debes Inciar Sesion", "Para poder agregar productos al carrito inicia sesion");
      this._router.navigate(["auth/login"]);
      return;
    }

    if(this.product().stock < this.quantity()){
      this._alertService.error("Error", "La cantidad supera al stock disponible");
      return;
    }

    this._cartService.addProductCart(
      {
        idProduct,
        quantity: this.quantity()
      }
    ).pipe(
      catchError(() => {
        this._alertService.error("Error", "No se agrego el producto al carrito");
        return EMPTY;
      })
    ).subscribe(() => {

      this._alertService.toastSuccess("El producto se agrego al carrito");
      this._router.navigate(["/cart"]);
    });

  }

  private loadImages(product: Product): void{

    if(product.images.length > 0){
      this.urlImage.set(`${environment.apiImages}${product.images.filter(image => image.type === "cover")[0].urlImage}`);
      return;
    }

    this.urlImage.set("https://cdni.iconscout.com/illustration/premium/thumb/404-7304110-5974976.png");
  }
}
