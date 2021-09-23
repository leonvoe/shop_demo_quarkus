package org.acme.service;


import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import org.acme.dto.ArticleDTO;
import org.acme.dto.ArticleDTOMapper;
import org.acme.dto.ArticleEntityMapper;
import org.acme.model.Article;
import org.acme.model.Category;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ArticleService {
    @Inject
    ArticleDTOMapper articleDTOMapper;

    @Inject
    ArticleEntityMapper articleEntityMapper;

    public ArticleDTO getArticleById(Long id) {
        return articleDTOMapper.toResource(Article.findById(id));
    }

    public List<ArticleDTO> getAllArticles() {
        List<Article> articlesList = new ArrayList<>();
        articlesList.addAll(Article.listAll());
        List<ArticleDTO> articleDTOList = new ArrayList<>();

        for(int i = 0; i < Article.count(); i++) {
            articleDTOList.add(articleDTOMapper.toResource(articlesList.get(i)));
        }

        return articleDTOList;
    }


    public List<ArticleDTO> getAllArticlesPagination(int size, int page) {
        PanacheQuery<Article> articlesList = Article.findAll();

        List<Article> articlesListPaged;
        articlesListPaged = articlesList.page(Page.of(page, size)).list();

        List<ArticleDTO> articleDTOList = new ArrayList<>();

        articlesListPaged.stream().forEach(a -> articleDTOList.add(articleDTOMapper.toResource(a)));

        return articleDTOList;

    }


    public List<ArticleDTO> findAllByNameAndDescription(String searchVal, String filterVal) {
        Category filterValEnum = null;
        List<ArticleDTO> articleDTOList = new ArrayList<>();
        List<Article> filteredArticles;

        switch(filterVal) {
            case "Toys":
                filterValEnum = Category.TOYS;
                break;
            case "Fashion":
                filterValEnum = Category.FASHION;
                break;
            case "Books":
                filterValEnum = Category.BOOKS;
                break;
            case "Movies":
                filterValEnum = Category.MOVIES;
                break;
            case "Games":
                filterValEnum = Category.GAMES;
                break;
            case "Music":
                filterValEnum = Category.MUSIC;
                break;
            default:
                filterVal = "";
                break;
        }

        if(filterVal.equals("")) {
            filteredArticles = Article.list("name = ?1 or description = ?1", searchVal);
        }
        else {
            filteredArticles = Article.list("select a from Article a where a.category = ?1", filterValEnum);
        }
        filteredArticles.stream().forEach(a -> articleDTOList.add(articleDTOMapper.toResource(a)));

        return articleDTOList;
    }

    public void insertArticle(ArticleDTO articleDTO) {
        Article.persist(articleEntityMapper.toResource(articleDTO));
    }

    public void deleteArticle(Long id) {
        Article.deleteById(id);
    }

    public void updateArticle(Long id, ArticleDTO newArticleDTO) {
        int category = 0;

        switch(newArticleDTO.getCategory()) {
            case TOYS:
                category=0;
                break;
            case FASHION:
                category=1;
                break;
            case BOOKS:
                category=2;
                break;
            case MOVIES:
                category=3;
                break;
            case GAMES:
                category=4;
                break;
            case MUSIC:
                category=5;
                break;
            default:
                break;
        }
        Article.update("name = '" + newArticleDTO.getName() + "', description ='" + newArticleDTO.getDescription() + "', category = '" + category + "' where id = ?1", id);
    }
}
