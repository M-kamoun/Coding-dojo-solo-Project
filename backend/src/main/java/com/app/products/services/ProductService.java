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
		Pageable pageable = PageRequest.of(pageNumber, pageSize,Sort.by(Sort.Direction.DESC, "createdAt"));
		return productRepo.findByIsActiveTrue(pageable);
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
	
	public Optional<Product> updateProduct(long id, Product product) {
	    return productRepo.findById(id).map(existingProduct -> {
	        existingProduct.setName(product.getName());
	        existingProduct.setDescription(product.getDescription());
	        existingProduct.setPrice(product.getPrice());
	        existingProduct.setCategory(product.getCategory());

	        return productRepo.save(existingProduct);
	    });
	}
	
	
	// product can not be deleted
	// it can be not active
	// if id is present in optional result findById(id) we set Active to false and save the product.
	
	public Optional<Product> deactivateProduct(long id) {
	    return productRepo.findById(id).map(existingProduct -> {
	        existingProduct.setIsActive(false); 
	        return productRepo.save(existingProduct); 
	    });
	}
	

}
