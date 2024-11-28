package com.app.products.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.products.models.Order;
import com.app.products.services.OrderService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins="http://localhost:3000")
public class OrderController {
	
private final OrderService orderServ;

	

	public OrderController(OrderService orderServ) {
	
	this.orderServ = orderServ;
}



	@GetMapping("/orders")
	public ResponseEntity<List<Order>> getAllorders() {
		return ResponseEntity.status(HttpStatus.OK).body(orderServ.getAllOrders());
	}
	
	
	
	@GetMapping("/orders-pagination")
	public ResponseEntity<Page<Order>> getAllordersWPagination(
			@RequestParam(defaultValue="0",required=false) int pageNumber,
			@RequestParam(defaultValue="5",required=false) int pageSize)
	{
		Page<Order> orders = orderServ.getAllOrdersWPagination(pageNumber, pageSize);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
	
	
	@GetMapping("/orders/{id}")
	public ResponseEntity<Order> getorderById(@PathVariable() Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(orderServ.getOrderstById(id));
	}
	
	
	@PostMapping("/orders/new")
	public ResponseEntity<Order> neworder( @RequestBody @Valid Order order ){
		return ResponseEntity.status(HttpStatus.CREATED).body(orderServ.saveOrder(order));
	}
	
	@PutMapping("orders/{id}/edit")
	public ResponseEntity<?> updateorder(@PathVariable Long id, @Valid @RequestBody Order order) {
	    Optional<Order> updatedOrder = orderServ.updateOrder(id, order);

	    if (updatedOrder.isPresent()) {
	        return ResponseEntity.ok(updatedOrder.get()); 
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("order with ID " + id + " not found");
	    }
	}
	
	

}
