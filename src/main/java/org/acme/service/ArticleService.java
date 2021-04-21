package org.acme.service;


import com.google.common.collect.Lists;
import org.acme.dto.ArticleDTO;
import org.acme.dto.ArticleMapper;
import org.acme.model.Article;
import org.acme.model.Order;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ArticleService {
    @Inject
    ArticleMapper articleMapper;

    public ArticleDTO getArticleById(Long id) {
        return articleMapper.toResource(Article.findById(id));
    }

    public List<ArticleDTO> getAllArticles() {
        List<Article> articlesList = new ArrayList<>();
        articlesList.addAll(Article.listAll());
        List<ArticleDTO> articleDTOList = new ArrayList<>();

        for(int i = 0; i < Article.count() - 1; i++) {
            articleDTOList.add(articleMapper.toResource(articlesList.get(i)));
        }

        return articleDTOList;

    }

    public void insertArticle(Article article) {
        Article.persist(article);
    }

    public void deleteArticle(Long id) {
        Article.deleteById(id);
    }

    public void updateArticle(Long id, Article newArticle) {
        //
    }
}
