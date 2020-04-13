import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPizzasComponent } from './all-pizzas/all-pizzas.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';
import { PizzaService } from './services/pizza.service';
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [
    AppComponent,
    AllPizzasComponent,
    EditPizzaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    PizzaService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
