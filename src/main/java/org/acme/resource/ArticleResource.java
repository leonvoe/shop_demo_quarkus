package org.acme.resource;

import org.acme.dto.ArticleDTO;
import org.acme.model.Article;
import org.acme.service.ArticleService;
import org.bson.types.ObjectId;

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
    public ArticleDTO findById(@PathParam("id")String id) {
        return articleService.getArticleById(new ObjectId(id));
    }

    @GET
    @Produces("application/json")
    public List<ArticleDTO> findAll() {
        return articleService.getAllArticles();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertArticle(ArticleDTO articleDTO) {
        articleService.insertArticle(articleDTO);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteArticle(@PathParam("id") String id) {
        articleService.deleteArticle(new ObjectId(id));
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateArticle(@PathParam("id") String id, ArticleDTO newArticle) {
        articleService.updateArticle(new ObjectId(id), newArticle);
    }


}
