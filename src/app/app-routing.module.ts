import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { MyAccountComponent } from "./components/my-account/my-account.component";

import { ViewCartComponent } from "./components/view-cart/view-cart.component";
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categories/:categoryId', component: ProductsPageComponent },
  { path: 'product/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: ViewCartComponent },
  { path: 'about-us', component:AboutUsComponent },
  { path: 'contact-us', component:ContactUsComponent },
  { path: 'my-account', component:MyAccountComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
