import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../models/pizza';

@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.component.html',
  styleUrls: ['./edit-pizza.component.css']
})
export class EditPizzaComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formNombre: string;
  formImagen: string;
  formPrecio: string;
  formIngredientes: string;
  PizzaId: number;
  errorMessage: any;
  existingPizza: Pizza;

  constructor(private pizzaservice: PizzaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Agregar';
    this.formNombre = 'Nombre';
    this.formImagen = 'Imagen';
    this.formPrecio = 'Precio';
    this.formIngredientes = 'Ingredientes';
    if (this.avRoute.snapshot.params[idParam]) {
      this.PizzaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        PizzaId: 0,
        Nombre: ['', [Validators.required]],
        Imagen: [''],
        Precio: ['', [Validators.required]],
        Ingredientes: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    if (this.PizzaId > 0) {
      this.actionType = 'Editar';
      this.pizzaservice.getPizza(this.PizzaId)
        .subscribe(data => (
          this.existingPizza = data,
          this.form.controls[this.formNombre].setValue(data.Nombre),
          this.form.controls[this.formImagen].setValue(data.Imagen),
          this.form.controls[this.formPrecio].setValue(data.Precio),
          this.form.controls[this.formIngredientes].setValue(data.Ingredientes)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Agregar') {
      let pizza: Pizza = {
        Nombre: this.form.get(this.formNombre).value,
        Imagen: this.form.get(this.formImagen).value,
        Precio: this.form.get(this.formPrecio).value,
        Ingredientes: this.form.get(this.formIngredientes).value
      };

      this.pizzaservice.savePizza(pizza)
        .subscribe((data) => {
          this.router.navigate(['/pizza', data.PizzaId]);
        });
    }

    if (this.actionType === 'Editar') {
      let pizza: Pizza = {
        PizzaId: this.existingPizza.PizzaId,
        Nombre: this.form.get(this.formNombre).value,
        Imagen: this.form.get(this.formImagen).value,
        Precio: this.form.get(this.formPrecio).value,
        Ingredientes: this.form.get(this.formIngredientes).value
      };
      this.pizzaservice.updatePizza(pizza.PizzaId, pizza)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get Nombre() { return this.form.get(this.formNombre); }
  get Imagen() { return this.form.get(this.formImagen); }
  get Precio() { return this.form.get(this.formPrecio); }
  get Ingredientes() { return this.form.get(this.formIngredientes); }

}
