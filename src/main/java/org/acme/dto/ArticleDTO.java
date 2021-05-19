package org.acme.dto;

import org.acme.model.Category;
import org.acme.model.Order;

import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.util.List;

public class ArticleDTO {
    private String name;
    private String description;
    private Category category;

    public ArticleDTO(String name, String description, Category category) {
        this.name = name;
        this.description = description;
        this.category = category;
    }

    public ArticleDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
