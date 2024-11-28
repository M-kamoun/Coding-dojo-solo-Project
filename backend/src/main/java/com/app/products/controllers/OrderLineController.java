package com.app.products.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.products.models.Category;
import com.app.products.models.OrderLine;
import com.app.products.services.OrderLineService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins="http://localhost:3000")
public class OrderLineController {
	
private final OrderLineService orderLineServ;

	

	


	public OrderLineController(OrderLineService orderLineServ) {
	
	this.orderLineServ = orderLineServ;
}


	@GetMapping("/orderslines")
	public ResponseEntity<List<OrderLine>> getAllorders() {
		return ResponseEntity.status(HttpStatus.OK).body(orderLineServ.getAllOrderLine());
	}
	
	
	
	
	
	@GetMapping("/ordersline/{id}")
	public ResponseEntity<OrderLine> getorderLineById(@PathVariable() Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(orderLineServ.getOrderLinetById(id));
	}
	
	
	@PostMapping("/ordersline/new")
	public ResponseEntity<OrderLine> neworderLine( @RequestBody @Valid OrderLine orderLine ){
		return ResponseEntity.status(HttpStatus.CREATED).body(orderLineServ.saveOrderLine(orderLine));
	}
	
	@PutMapping("ordersLine/{id}/edit")
	public ResponseEntity<OrderLine> updateOrderLine(@PathVariable() Long id , @RequestBody OrderLine orderLine ){
		orderLine.setId(id);
		return ResponseEntity.status(HttpStatus.OK).body(orderLineServ.updateOrderLine(orderLine));
	}
	
	

}
