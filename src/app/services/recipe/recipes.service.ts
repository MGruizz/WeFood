import {Recipe} from "./recipe.type";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class RecipesService{
  recetas : Recipe[] = [];
  constructor() {
    this.recetas = [
      {
        nombreReceta : 'Choripan',
        descripcionReceta: ' Pan batido con chorizo ',
        ingredientes:'Pan Batido, Chorizo',
        pasosReceta:'Hacer el chorizo en la parrilla y meterlo al pan batio',
        imagenes:['../../assets/imagenes/choripan.jpg'],
      } as Recipe,
      {
        nombreReceta : 'Choripan',
        descripcionReceta: ' Pan batido con chorizo ',
        ingredientes:'Pan Batido, Chorizo',
        pasosReceta:'Hacer el chorizo en la parrilla y meterlo al pan batio',
        imagenes:['../../assets/imagenes/choripan.jpg'],
      } as Recipe,
      {
        nombreReceta : 'Choripan',
        descripcionReceta: ' Pan batido con chorizo ',
        ingredientes:'Pan Batido, Chorizo',
        pasosReceta:'Hacer el chorizo en la parrilla y meterlo al pan batio',
        imagenes:['../../assets/imagenes/choripan.jpg'],
      } as Recipe,
      {
        nombreReceta : 'Choripan',
        descripcionReceta: ' Pan batido con chorizo ',
        ingredientes:'Pan Batido, Chorizo',
        pasosReceta:'Hacer el chorizo en la parrilla y meterlo al pan batio',
        imagenes:['../../assets/imagenes/choripan.jpg'],
      } as Recipe
    ]
  }


}
