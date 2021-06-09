package org.acme.resource;

import org.acme.dto.ArticleDTO;
import org.acme.model.Article;
import org.acme.service.ArticleService;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/article")
public class ArticleResource {

    @Inject
    ArticleService articleService;

    @GET
    @PermitAll
    @Path("{id}")
    @Produces("application/json")
    public ArticleDTO findById(@PathParam("id")Long id) {
        return articleService.getArticleById(id);
    }

    @GET
    @PermitAll
    @Produces("application/json")
    public List<ArticleDTO> findAll() {
        return articleService.getAllArticles();
    }

    @GET
    @Path("paginated")
    @PermitAll
    @Produces("application/json")
    public List<ArticleDTO> findAllPaginated(@DefaultValue("0") @QueryParam("page") String page, @DefaultValue("10") @QueryParam("size") String size) {
        return articleService.getAllArticlesPagination(Integer.parseInt(size), Integer.parseInt(page));
    }

    @GET
    @Path("search")
    @PermitAll
    @Produces("application/json")
    public List<ArticleDTO> findAllByNameAndDescriptionAndCategory(@DefaultValue("") @QueryParam("search") String searchValue, @DefaultValue("") @QueryParam("filter") String filterValue) {
        return articleService.findAllByNameAndDescription(searchValue, filterValue);
    }



    @GET
    @Path("length")
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public String length() {
        return String.valueOf(Article.count());

    }

    @POST
    @RolesAllowed("admin")
    @Transactional
    @Consumes("application/json")
    public void insertArticle(ArticleDTO articleDTO) {
        articleService.insertArticle(articleDTO);
    }

    @DELETE
    @RolesAllowed("admin")
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteArticle(@PathParam("id") Long id) {
        articleService.deleteArticle(id);
    }

    @PUT
    @RolesAllowed("admin")
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateArticle(@PathParam("id") Long id, ArticleDTO newArticle) {
        articleService.updateArticle(id, newArticle);
    }


}
