package org.acme.service;


import org.acme.dto.ArticleDTO;
import org.acme.dto.ArticleDTOMapper;
import org.acme.dto.ArticleEntityMapper;
import org.acme.model.Article;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
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

    public void insertArticle(ArticleDTO articleDTO) {
        Article.persist(articleEntityMapper.toResource(articleDTO));
    }

    public void deleteArticle(Long id) {
        Article.deleteById(id);
    }

    public void updateArticle(Long id, ArticleDTO newArticleDTO) {
        //
    }
}
