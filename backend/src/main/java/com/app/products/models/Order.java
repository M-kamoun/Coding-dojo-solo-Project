package com.app.products.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="Orders")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message = "Code is required")
	@Size(min=6,max=6,message="Code must be exactly 6 characters ")
	private String code;
	
	@NotNull(message = "Order date is required")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDate orderDate;
	
	@Column(name = "Order_Status")
	@Enumerated(EnumType.STRING)
	private StatusOrder status=StatusOrder.Pending;
	
	// relation with supplier
	
	 @ManyToOne
	 @JoinColumn(name = "supplier_id")
	 private Supplier supplier;
	 
	 // relation with orderLine
	 
	 @OneToMany(mappedBy = "order")
	 private List<OrderLine> ordersLines;
	 
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
	    
	    
		public Order() {
			
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		public LocalDate getOrderDate() {
			return orderDate;
		}
		public void setOrderDate(LocalDate orderDate) {
			this.orderDate = orderDate;
		}
		public StatusOrder getStatus() {
			return status;
		}
		public void setStatus(StatusOrder status) {
			this.status = status;
		}
		public Supplier getSupplier() {
			return supplier;
		}
		public void setSupplier(Supplier supplier) {
			this.supplier = supplier;
		}
		public List<OrderLine> getOrdersLines() {
			return ordersLines;
		}
		public void setOrdersLines(List<OrderLine> ordersLines) {
			this.ordersLines = ordersLines;
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
