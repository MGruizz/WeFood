export interface Comentario{
  idComentario: number;
  comentario: string;
  nombreAutor: string;
  idReceta: number;

}

export interface ComentarioDTO{
  idcomentario: number;
  comentario: string;
  nombreusuario: string;
  idreceta: number;

}

export interface NuevoComentario{
  comentario:string;
  nombreAutor: string;
  idReceta: number;
}
