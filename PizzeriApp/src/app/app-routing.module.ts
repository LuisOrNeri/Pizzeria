import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPizzasComponent } from './all-pizzas/all-pizzas.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';


const routes: Routes = [
  { path: '', component: AllPizzasComponent, pathMatch: 'full' },
  { path: 'pizza/edit/:id', component: EditPizzaComponent },
  { path: 'add', component: EditPizzaComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
