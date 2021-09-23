package org.acme.dto;

import org.acme.model.Article;
import org.mapstruct.Mapper;

@Mapper(componentModel = "cdi")
public interface ArticleEntityMapper {
    Article toResource(ArticleDTO articleDTO);

}
