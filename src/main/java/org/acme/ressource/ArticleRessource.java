package org.acme.ressource;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import org.acme.model.Article;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/article")
@Produces("application/json")
@Consumes("application/json")
public class ArticleRessource {

    @GET
    @Produces("application/json")
    @Consumes("application/json")
    @Path("{id}")
    public Article findById(@PathParam("id")Long id) {
        return Article.findById(id);
    }

    @POST
    @Transactional
    @Produces("application/json")
    @Consumes("application/json")
    public void insertArticle(Article article) {
        Article.persist(article);
    }

}
