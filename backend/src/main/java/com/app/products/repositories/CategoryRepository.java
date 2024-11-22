package com.app.products.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.products.models.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	Page<Category> findAll(Pageable pabeable);
}
