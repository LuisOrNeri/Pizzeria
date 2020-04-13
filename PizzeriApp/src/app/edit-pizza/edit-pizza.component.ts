import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../models/pizza';
import { ImageService } from '../services/image.service';
import { HttpErrorResponse } from '@angular/common/http';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.component.html',
  styleUrls: ['./edit-pizza.component.css']
})
export class EditPizzaComponent implements OnInit {
  selectedFile: ImageSnippet;
  form: FormGroup;
  actionType: string;
  formName: string;
  formImage: string;
  formPrice: string;
  formIngredients: string;
  pizzaId: number;
  errorMessage: any;
  existingPizza: Pizza;

  constructor(private pizzaservice: PizzaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, private imageService: ImageService) {
    const idParam = 'id';
    this.actionType = 'Agregar';
    this.formName = 'name';
    this.formImage = 'image';
    this.formPrice = 'price';
    this.formIngredients = 'ingredients';
    if (this.avRoute.snapshot.params[idParam]) {
      this.pizzaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        pizzaId: 0,
        name: ['', [Validators.required]],
        image: [''],
        price: ['', [Validators.required]],
        ingredients: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    if (this.pizzaId > 0) {
      this.actionType = 'Editar';
      this.pizzaservice.getPizza(this.pizzaId)
        .subscribe(data => (
          this.existingPizza = data,
          this.form.controls[this.formName].setValue(data.name),
          this.form.controls[this.formImage].setValue(data.image),
          this.form.controls[this.formPrice].setValue(data.price),
          this.form.controls[this.formIngredients].setValue(data.ingredients)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Agregar') {
      let pizza: Pizza = {
        name: this.form.get(this.formName).value,
        image: this.form.get(this.formImage).value,
        price: this.form.get(this.formPrice).value,
        ingredients: this.form.get(this.formIngredients).value
      };

      this.pizzaservice.savePizza(pizza)
        .subscribe((data) => {
          this.router.navigate(['/']);
          //this.router.navigate(['/pizza/edit/', data.pizzaId]);
        });
    }

    if (this.actionType === 'Editar') {
      let pizza: Pizza = {
        pizzaId: this.existingPizza.pizzaId,
        name: this.form.get(this.formName).value,
        image: this.form.get(this.formImage).value,
        price: this.form.get(this.formPrice).value,
        ingredients: this.form.get(this.formIngredients).value
      };
      this.pizzaservice.updatePizza(pizza.pizzaId, pizza)
        .subscribe((data) => {
          this.router.navigate(['/']);
          //this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  private onSuccess(imageUrl: string) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (imageUrl: string) => {
          this.onSuccess(imageUrl);
        },
        (errorResponse: HttpErrorResponse) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  get name() { return this.form.get(this.formName); }
  get image() { return this.form.get(this.formImage); }
  get price() { return this.form.get(this.formPrice); }
  get ingredients() { return this.form.get(this.formIngredients); }

}
