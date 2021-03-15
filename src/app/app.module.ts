import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { CategoriesComponent } from './components/home/categories/categories.component';
import { sliderService } from './components/home/slider/slider.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsService } from './components/product-details/product-details.service';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyDetailsComponent } from './components/my-account/my-details/my-details.component';
import { MyAddressComponent } from './components/my-account/my-address/my-address.component';
import { MyOrdersComponent } from './components/my-account/my-orders/my-orders.component';
import { NewslettersComponent } from './components/my-account/newsletters/newsletters.component';
import { SettingsComponent } from './components/my-account/settings/settings.component';
import { MyFavouritesComponent } from './components/my-account/my-favourites/my-favourites.component';
import { AuthGuard } from './components/auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductsPageComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    SliderComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ViewCartComponent,
    ThanksComponent,
    AboutUsComponent,
    ContactUsComponent,
    MyAccountComponent,
    MyDetailsComponent,
    MyAddressComponent,
    MyOrdersComponent,
    NewslettersComponent,
    SettingsComponent,
    MyFavouritesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    sliderService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
