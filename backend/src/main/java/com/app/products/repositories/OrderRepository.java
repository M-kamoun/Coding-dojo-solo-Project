package com.app.products.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.products.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
