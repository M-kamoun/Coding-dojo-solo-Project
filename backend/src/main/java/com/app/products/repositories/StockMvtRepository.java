package com.app.products.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.products.models.StockMvt;

public interface StockMvtRepository extends JpaRepository<StockMvt, Long>{

}
