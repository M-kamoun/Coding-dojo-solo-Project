package com.app.products.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="suppliers")
public class Supplier {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message="Product Name  must not be empty ")
	@Size(min=1,max=255,message="Product Name  must not be empty ")
	private String name;
	
	@NotNull(message="Address Name  must not be empty ")
	@Size(min=1,max=255,message="Address   must not be empty ")
	
	private String address;
	
	@NotEmpty(message="Email is required!")
    @Email()
    private String email;
	
	
	// relation with order
	 @OneToMany(mappedBy = "supplier")
	  private List<Order> orders;
	
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
		public Supplier() {
			
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
		
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public List<Order> getOrders() {
			return orders;
		}
		public void setOrders(List<Order> orders) {
			this.orders = orders;
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
