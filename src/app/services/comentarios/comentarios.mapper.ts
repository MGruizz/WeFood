import {Injectable} from "@angular/core";

import {Comentario, ComentarioDTO} from "./comentarios.type";

@Injectable({
  providedIn: 'root'
})

export class ComentariosMapper {
  constructor() {
  }

  mapComentarioToComentarioDto(comentario: Comentario): ComentarioDTO {
    const comentarioDTO = {} as ComentarioDTO;
    comentarioDTO.comentario = comentario.comentario;
    comentarioDTO.nombreusuario = comentario.nombreAutor;
    comentarioDTO.idcomentario = comentario.idComentario
    return comentarioDTO;
  }

  mapComentarioDTOToComentario(comentarioDTO: ComentarioDTO): Comentario {
    const comentario = {} as Comentario;
    comentario.comentario = comentarioDTO.comentario;
    comentario.nombreAutor = comentarioDTO.nombreusuario;
    comentario.idComentario = comentarioDTO.idcomentario
    return comentario;
  }
}
