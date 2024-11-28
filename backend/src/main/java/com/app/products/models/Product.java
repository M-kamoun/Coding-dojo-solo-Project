package com.app.products.models;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="products")
public class Product {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message="Product Name  must not be empty ")
	@Size(min=1,max=255,message="Product Name  must not be empty ")
	private String name;
	
	@NotNull(message="Description must not be empty ")
	@Size(min=1,max=255,message="Description must not be empty ")
    private String description;
	
	@NotNull(message="Price must not be empty")
	@Min(value=1,message="Price must be greater than 0")
    private Double price;
	
	
	@NotNull()
	private Boolean isActive=true;
	
	
	
	// Relation with category
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="category_id")
	@JsonBackReference
	private Category category;
	
	
	@JsonProperty("categoryId")
	public Long getCategoryId() {
	    return category != null ? category.getId() : null;
	}
	
	// relation with orderLine
	
	 @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
	 private List<OrderLine> orderlines;
	 
	 
	 
	 public List<StockMvt> getMvtStocks() {
		return mvtStocks;
	}
	public void setMvtStocks(List<StockMvt> mvtStocks) {
		this.mvtStocks = mvtStocks;
	}
	// relation with stock movement

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	 private List<StockMvt> mvtStocks;
	
	 
	public List<OrderLine> getOrderlines() {
		return orderlines;
	}
	public void setOrderlines(List<OrderLine> orderlines) {
		this.orderlines = orderlines;
	}

	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(updatable=false)
	private LocalDateTime createdAt;
	
	 @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime updatedAt;
	
	@PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
	public Product() {
		
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
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
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	
	
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	
	
	
	
	

}
