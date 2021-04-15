package org.acme.resource;

import org.acme.model.Article;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.util.List;

@Path("/article")
public class ArticleResource {

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Article findById(@PathParam("id")Long id) {
        return Article.findById(id);
    }

    @GET
    @Produces("application/json")
    public List<Article> findAll() {
        return Article.listAll();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertArticle(Article article) {
        Article.persist(article);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteArticle(@PathParam("id") Long id) {
        Article.deleteById(id);
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateArticle(@PathParam("id") Long id, Article newArticle) {
        //
    }


}
