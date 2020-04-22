import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../models/pizza';

@Component({
  selector: 'app-all-pizzas',
  templateUrl: './all-pizzas.component.html',
  styleUrls: ['./all-pizzas.component.css']
})
export class AllPizzasComponent implements OnInit {
allPizzas$: Observable<Pizza[]>;
arrPizzas: Pizza[];

  constructor(private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.loadPizzas();
  }

  loadPizzas() {
    this.arrPizzas = [];
    this.allPizzas$ = this.pizzaService.getPizzas();
    this.allPizzas$.forEach((Obs) => {
      Obs.forEach((pizza) => {
        if(pizza.image != null){
          pizza.image = '/assets/img/uploads/'+pizza.image;
        }
        else{
          pizza.image = '/assets/img/uploads/default-image.jpg';
        }
        this.arrPizzas.push(pizza);
      })
    })
  }

  delete(name: string, pizzaId: number) {
    const ans = confirm('Quieres borrar la pizza con el nombre: '+name+' ?');
    if(ans) {
      this.pizzaService.deletePizza(pizzaId).subscribe((data) => {
        this.loadPizzas();
      });
    }
  }

}
