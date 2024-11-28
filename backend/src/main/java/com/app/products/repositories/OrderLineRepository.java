package com.app.products.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.products.models.OrderLine;

public interface OrderLineRepository extends JpaRepository<OrderLine, Long>{

}
