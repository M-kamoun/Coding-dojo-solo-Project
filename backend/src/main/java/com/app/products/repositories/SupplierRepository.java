package com.app.products.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.products.models.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}
