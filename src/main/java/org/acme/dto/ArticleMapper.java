package org.acme.dto;

import org.acme.model.Article;
import org.acme.model.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "cdi")
public interface ArticleMapper {
    @Mapping(target = "name", source = "name")
    ArticleDTO toResource(Article article);

}
