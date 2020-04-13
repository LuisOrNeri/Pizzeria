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

  constructor(private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.loadPizzas();
  }

  loadPizzas() {
    this.allPizzas$ = this.pizzaService.getPizzas();
  }

  delete(pizzaId) {
    const ans = confirm('Quieres borrar la pizza con el id: '+pizzaId+' ?');
    if(ans) {
      this.pizzaService.deletePizza(pizzaId).subscribe((data) => {
        this.loadPizzas();
      });
    }
  }

}
