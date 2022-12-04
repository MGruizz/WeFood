export interface Comentario{
  idComentario: number;
  comentario: string;
  nombreAutor: string;
}

export interface ComentarioDTO{
  idcomentario: number;
  comentario: string;
  nombreusuario: string;
}

export interface NuevoComentario{
  comentario:string;
  nombreAutor: string;
}
