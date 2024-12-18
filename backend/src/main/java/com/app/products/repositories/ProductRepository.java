package com.app.products.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.products.models.Product;

// we use JpaRepository that extends PagingAndSortingRepository 
//which in turn extends CrudRepository. 
// we will have all the functions of CrudRepository and PagingAndSortingRepository
// When using spring data jpa you don't need to specify repository explicitly


public interface ProductRepository extends JpaRepository<Product, Long> {
	
	Page<Product> findByIsActiveTrue(Pageable pageable);

}
