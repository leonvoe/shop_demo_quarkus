package org.acme.dto;

import org.acme.model.Article;
import org.acme.model.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "cdi")
public interface ArticleDTOMapper {
    ArticleDTO toResource(Article article);

}
