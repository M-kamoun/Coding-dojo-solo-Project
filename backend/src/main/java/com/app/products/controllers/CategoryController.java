package com.app.products.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.products.models.Category;

import com.app.products.services.CategoryService;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins="http://localhost:3000")
public class CategoryController {
	
	private final CategoryService categorytServ;

	public CategoryController(CategoryService categorytServ) {
	
		this.categorytServ= categorytServ;
	}
	
	
	
	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getAllCategories() {
		return ResponseEntity.status(HttpStatus.OK).body(categorytServ.getAllCategories());
	}
	
	@GetMapping("/categories/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable() Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(categorytServ.getCategoriestById(id));
	}
	
	
	@PostMapping("/categories/new")
	public ResponseEntity<Category> newCategory(@RequestBody Category category ){
		return ResponseEntity.status(HttpStatus.CREATED).body(categorytServ.saveCategory(category));
	}
	
	@PutMapping("categories/{id}/edit")
	public ResponseEntity<Category> updateCategory(@PathVariable() Long id , @RequestBody Category category ){
		category.setId(id);
		return ResponseEntity.status(HttpStatus.OK).body(categorytServ.updateCategory(category));
	}
	
	@DeleteMapping("categories/{id}/delete")
	public ResponseEntity<String> deleteCategory(@PathVariable() Long id ){
		categorytServ.delete(id);
		return ResponseEntity.ok("category deleted successfully!");
	}
	
	
	

	
}
