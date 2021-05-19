package org.acme.model;



import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import org.bson.types.ObjectId;

import javax.persistence.*;
import java.util.List;

@MongoEntity
public class Order extends PanacheMongoEntity {
    @Id
    public ObjectId id;
    private Shipping shipping;
    private String notes;
    private Status status = Status.INPROGRESS;
    private Customer customer;
    private List<Article> articles;


    public Order(ObjectId id, Shipping shipping, String notes, Status status, Customer customer, List<Article> articles) {
        this.id = id;
        this.shipping = shipping;
        this.notes = notes;
        this.status = status;
        this.customer = customer;
        this.articles = articles;
    }

    public Order() {
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Shipping getShipping() {
        return shipping;
    }

    public void setShipping(Shipping shipping) {
        this.shipping = shipping;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}
