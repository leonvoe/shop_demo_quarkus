package org.acme.dto;

import org.acme.model.Shipping;
import org.acme.model.Status;

import java.util.List;

public class OrderDTO {
    private Long id;
    private Shipping shipping;
    private String notes;
    private Status status;
    private CustomerDTO customer;
    private List<ArticleDTO> articles;

    public OrderDTO(Long id, Shipping shipping, String notes, Status status, CustomerDTO customer, List<ArticleDTO> articles) {
        this.id = id;
        this.shipping = shipping;
        this.notes = notes;
        this.status = status;
        this.customer = customer;
        this.articles = articles;
    }

    public OrderDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public List<ArticleDTO> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticleDTO> articles) {
        this.articles = articles;
    }
}
