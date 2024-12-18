package com.app.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.products.models.Category;
import com.app.products.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	private final CategoryRepository categoryRepo;

	
	
	
	public CategoryService(CategoryRepository categoryRepo) {
		super();
		this.categoryRepo = categoryRepo;
	}

	// Get All categories 
	public List<Category> getAllCategories(){
		return categoryRepo.findAll();
	}

	
	
	//get Category by Id
	public Category getCategoriestById(Long id) {
		Optional<Category> optionalCategory = categoryRepo.findById(id);
		if(optionalCategory.isPresent()) {
			return optionalCategory.get();
		}else {
			return 	null;
		}
			
	}
	
	
	
	// Create a category
	public Category saveCategory(Category category) {
		return categoryRepo.save(category);
	}
	
	
	
	// update a category
	public Category updateCategory(Category category) {
		return categoryRepo.save(category);
	}
	
	
	//delete category
	public void delete(Long id) { 
		categoryRepo.deleteById(id);
	}
	
	

}
