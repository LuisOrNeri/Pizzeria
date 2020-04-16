import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../models/pizza';
import { ImageService } from '../services/image.service';
import { HttpErrorResponse, HttpEventType, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.component.html',
  styleUrls: ['./edit-pizza.component.css']
})
export class EditPizzaComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formName: string;
  formPrice: string;
  formIngredients: string;
  pizzaId: number;
  errorMessage: any;
  existingPizza: Pizza;
  imageBase: string = "/assets/img/default-image.jpg";
  fileToUpload: File = null;
  message: string;
  nameOfImage: string;

  constructor(private pizzaservice: PizzaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, private imageService: ImageService, private http: HttpClient) {
    const idParam = 'id';
    this.actionType = 'Agregar';
    this.formName = 'name';
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
          //this.form.controls[this.formImage].setValue(data.image),
          this.form.controls[this.formPrice].setValue(data.price),
          this.form.controls[this.formIngredients].setValue(data.ingredients)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    if(this.fileToUpload != null){
      this.nameOfImage = this.fileToUpload.name;
    }
    else {
      this.nameOfImage = '';
    }

    if (this.actionType === 'Agregar') {
      let pizza: Pizza = {
        name: this.form.get(this.formName).value,
        image: this.nameOfImage,
        price: this.form.get(this.formPrice).value,
        ingredients: this.form.get(this.formIngredients).value
      };
      
      if(this.fileToUpload !== null){
        this.message = this.imageService.uploadImage(this.fileToUpload);
      }
      this.pizzaservice.savePizza(pizza)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }

    if (this.actionType === 'Editar') {
      let pizza: Pizza = {
        pizzaId: this.existingPizza.pizzaId,
        name: this.form.get(this.formName).value,
        image: this.nameOfImage,
        price: this.form.get(this.formPrice).value,
        ingredients: this.form.get(this.formIngredients).value
      };
      this.pizzaservice.updatePizza(pizza.pizzaId, pizza)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  handleFileInput(file : FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageBase = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  /*uploadFile() {
    this.message = this.imageService.uploadImage(this.fileToUpload);
    const formData = new FormData();
    formData.append('image', this.fileToUpload, this.fileToUpload.name);

    this.http.post('https://localhost:44363/api/Pizzas/nothing', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }*/

  get name() { return this.form.get(this.formName); }
  //get image() { return this.form.get(this.formImage); }
  get price() { return this.form.get(this.formPrice); }
  get ingredients() { return this.form.get(this.formIngredients); }

}
