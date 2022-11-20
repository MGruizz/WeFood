import {Injectable} from "@angular/core";
import {Tag, TagDTO} from "./tag.type";

@Injectable({
  providedIn: 'root'
})

export class TagMapper {
  constructor() {}
  mapTagToTagDto(tag : Tag):TagDTO{
    const tagDTO = {} as TagDTO;
    tagDTO.idtag=tag.idTag;
    tagDTO.nombretag=tag.nombreTag;
    return tagDTO;
  }
  mapTagDtoToTag(tagDTO: TagDTO): Tag {
  const tag = {} as Tag;
  tag.idTag = tagDTO.idtag;
  tag.nombreTag = tagDTO.nombretag;
  return tag;
  }
}


