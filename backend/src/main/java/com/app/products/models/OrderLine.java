package com.app.products.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="OrderLines")
public class OrderLine {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	// relation with product
	
	@ManyToOne
	  @JoinColumn(name = "product_id",nullable=false)
		@NotNull(message="product is required")
	  private Product product;
	
	// relation with order

	  @ManyToOne
	  @JoinColumn(name = "order_id",nullable=false)
	  @NotNull(message="order is required")
	  private Order order;
	  

	  @Column(name = "quantity")
	  @NotNull(message="Quantity is required")
	  @DecimalMin(value="0.1",inclusive=true,message="Quantity must be than or equal to 0.1")
	  private Double quantity;
	  
	  

	  @Column(name = "price")
	  @NotNull(message="price is required")
	  @DecimalMin(value="0.0",inclusive=true,message="Price must be positive number")
	  @Digits(integer=10,fraction=2,message="Price can have up to 10 digits and 2 decimals")
	  private BigDecimal price;
	  
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



	public OrderLine() {
		
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public Product getProduct() {
		return product;
	}



	public void setProduct(Product product) {
		this.product = product;
	}



	public Order getOrder() {
		return order;
	}



	public void setOrder(Order order) {
		this.order = order;
	}



	public Double getQuantity() {
		return quantity;
	}



	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}



	public BigDecimal getPrice() {
		return price;
	}



	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	
	
	
}
