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
    tagDTO.nombre=tag.nombreTag;
    return tagDTO;
  }
  mapTagDtoToTag(tagDTO: TagDTO): Tag {
  const tag = {} as Tag;
  tag.idTag = tagDTO.idtag;
  tag.nombreTag = tagDTO.nombre;
  return tag;
  }

  mapStringToTag(tagsName:string[],totalTags:Tag[]):number[]{
    const tags :number[] = [];
    for(let i in tagsName){
      tags.push((totalTags.find(({nombreTag}) => nombreTag == tagsName[i])!).idTag)
    }
    return tags;
  }
}


