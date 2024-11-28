package com.app.products.models;

import java.time.LocalDateTime;

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
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name="stocks_mouvements")
public class StockMvt {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime mvtDate;
	
	@PrePersist
    protected void onCreate(){
        this.mvtDate = LocalDateTime.now();
    }
	
	
	@Column(name = "description")
    private String description;
	
	
	
	@Column(name = "quantity")
	@NotNull(message="Quantity is required")
	@DecimalMin(value="0.1",inclusive=true,message="Quantity must be than or equal to 0.1")
	private Double quantity;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "movement_type", nullable = false)
	private MvtType mvtType;
	
	@ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

	public StockMvt() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getMvtDate() {
		return mvtDate;
	}

	public void setMvtDate(LocalDateTime mvtDate) {
		this.mvtDate = mvtDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public MvtType getMvtType() {
		return mvtType;
	}

	public void setMvtType(MvtType mvtType) {
		this.mvtType = mvtType;
	}
	

}
