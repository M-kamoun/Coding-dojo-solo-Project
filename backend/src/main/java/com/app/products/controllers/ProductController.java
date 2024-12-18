package com.app.products.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.products.models.Product;
import com.app.products.services.ProductService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class ProductController {
	
	private final ProductService productServ;

	public ProductController(ProductService productServ) {
		
		this.productServ = productServ;
	}
	
	
	
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts() {
		return ResponseEntity.status(HttpStatus.OK).body(productServ.getAllProducts());
	}
	
	
	
	@GetMapping("/products-pagination")
	public ResponseEntity<Page<Product>> getAllProductsWPagination(
			@RequestParam(defaultValue="0",required=false) int pageNumber,
			@RequestParam(defaultValue="5",required=false) int pageSize)
	{
		Page<Product> products = productServ.getAllProductsWPagination(pageNumber, pageSize);
		return ResponseEntity.status(HttpStatus.OK).body(products);
	}
	
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable() Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(productServ.getProductById(id));
	}
	
	
	@PostMapping("/products/new")
	public ResponseEntity<Product> newProduct( @RequestBody @Valid Product product ){
		return ResponseEntity.status(HttpStatus.CREATED).body(productServ.saveProduct(product));
	}
	
	@PutMapping("products/{id}/edit")
	public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
	    Optional<Product> updatedProduct = productServ.updateProduct(id, product);

	    if (updatedProduct.isPresent()) {
	        return ResponseEntity.ok(updatedProduct.get()); 
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with ID " + id + " not found");
	    }
	}
	
	// deactivate product
	@PutMapping("products/{id}/product-de-activation")
	public ResponseEntity<?> deActivateProduct(@PathVariable() Long id){
		
		return ResponseEntity.ok(productServ.deactivateProduct(id));
	}
	
	
		
	
	
	
	

}
