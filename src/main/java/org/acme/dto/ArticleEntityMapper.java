package org.acme.dto;

import org.acme.model.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "cdi")
public interface ArticleEntityMapper {
    Article toResource(ArticleDTO articleDTO);

}
