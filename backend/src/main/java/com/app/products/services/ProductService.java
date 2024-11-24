package com.app.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.products.models.Product;
import com.app.products.repositories.ProductRepository;

@Service
public class ProductService {

	private final ProductRepository productRepo;

	public ProductService(ProductRepository productRepo) {

		this.productRepo = productRepo;
	}
	
	
	// Get All products 
	public List<Product> getAllProducts(){
		return productRepo.findAll();
	}

	// Get All products with Pagination
	public Page<Product> getAllProductsWPagination(int pageNumber,int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize,Sort.Direction.ASC,"name");
		return productRepo.findAll(pageable);
	}
	
	//get product by Id
	public Product getProductById(Long id) {
		Optional<Product> optionalProduct = productRepo.findById(id);
		if(optionalProduct.isPresent()) {
			return optionalProduct.get();
		}else {
			return 	null;
		}
			
	}
	
	// Create a product
	public Product saveProduct(Product product) {
		return productRepo.save(product);
	}
	
	// update a product
	public Product updateProduct(Product product) {
		return productRepo.save(product);
	}
	
	
	// product can not be deleted
	// it can be not active
	// if id is present in optional result findById(id) we set Active to false and save the product.
	
	public void productActivation(Long id) {
		productRepo.findById(id).ifPresent(p->{
			p.setIsActive(false);
			productRepo.save(p);
		});
	}
	
	
	
	

}
