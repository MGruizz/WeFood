export interface Recipe{
  idAutor: number;
  idReceta: number;
  idDietas?: number[];
  nombreReceta : string;
  descripcionReceta: string;
  ingredientes: string;
  pasosReceta: string;
  imagenes : string[];
  autor: string;
}
