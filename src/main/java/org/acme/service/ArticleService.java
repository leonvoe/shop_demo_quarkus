package org.acme.service;


import org.acme.model.Article;
import org.acme.model.Order;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ArticleService {

    public Article getArticleById(Long id) {
        return Article.findById(id);
    }

    public List<Article> getAllArticles() {
        return Article.listAll();
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
