package org.acme.model;



import javax.persistence.*;
import java.util.List;

@Entity
public class Article {

    @Id
    private String id;
    private String name;
    private String description;
    private Category category;
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "articles")
    private List<Order> orders;

    public Article(String id, String name, String description, Category category, List<Order> orders) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.orders = orders;
    }

    public Article() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
