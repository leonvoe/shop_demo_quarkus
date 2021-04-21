package org.acme.resource;

import org.acme.dto.ArticleDTO;
import org.acme.model.Article;
import org.acme.service.ArticleService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.util.List;

@Path("/article")
public class ArticleResource {

    @Inject
    ArticleService articleService;

    @GET
    @Path("{id}")
    @Produces("application/json")
    public ArticleDTO findById(@PathParam("id")Long id) {
        return articleService.getArticleById(id);
    }

    @GET
    @Produces("application/json")
    public List<ArticleDTO> findAll() {
        return articleService.getAllArticles();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertArticle(Article article) {
        articleService.insertArticle(article);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteArticle(@PathParam("id") Long id) {
        articleService.deleteArticle(id);
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateArticle(@PathParam("id") Long id, Article newArticle) {
        articleService.updateArticle(id, newArticle);
    }


}
