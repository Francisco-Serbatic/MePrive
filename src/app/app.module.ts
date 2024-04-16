import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IntroImagesComponent } from './components/intro-images/intro-images.component';
import { MealComponent } from './components/meal/meal.component';
import { MealContainerComponent } from './components/meal-container/meal-container.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { BreakfastsComponent } from './components/breakfasts/breakfasts.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LunchMenuComponent } from './components/lunch-menu/lunch-menu.component';
import { PruebaFormsComponent } from './components/prueba-forms/prueba-forms.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    IntroImagesComponent,
    MealComponent,
    MealContainerComponent,
    PresentationComponent,
    PresentationComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    LoginPageComponent,
    AdminPageComponent,
    BreakfastsComponent,
    LoginFormComponent,
    LunchMenuComponent,
    PruebaFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
