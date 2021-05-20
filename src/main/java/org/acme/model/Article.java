package org.acme.model;



import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import org.bson.types.ObjectId;

import javax.persistence.Id;
import java.util.List;

@MongoEntity
public class Article extends PanacheMongoEntity {

    @Id
    public ObjectId id;
    private String name;
    private String description;
    private Category category;
    private List<Order> orders;

    public Article(ObjectId id, String name, String description, Category category, List<Order> orders) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.orders = orders;
    }

    public Article() {
    }

    public Object getId() {
        return id;
    }

    public void setId(ObjectId id) {
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
