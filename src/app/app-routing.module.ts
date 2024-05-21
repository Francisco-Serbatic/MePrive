import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { compileClassMetadata } from '@angular/compiler';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { MealContainerComponent } from './components/meal-container/meal-container.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';

const routes: Routes = [
  { // Esto te redirije ahome si tinenes la ruta vacia
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
  path: 'orders',
    component: OrdersPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    component: HomePageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
