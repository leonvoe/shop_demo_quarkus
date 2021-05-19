package org.acme.dto;

import org.acme.model.Category;
import org.acme.model.Order;
import org.bson.types.ObjectId;

import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.util.List;

public class ArticleDTO {
    private ObjectId id;
    private String name;
    private String description;
    private Category category;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ArticleDTO(ObjectId id, String name, String description, Category category) {
        this.id = id;
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
