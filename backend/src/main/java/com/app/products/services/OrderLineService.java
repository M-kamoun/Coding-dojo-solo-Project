
package com.app.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.products.models.OrderLine;
import com.app.products.repositories.OrderLineRepository;


@Service
public class OrderLineService {
	
private final OrderLineRepository orderLineRepo;

	
	public OrderLineService(OrderLineRepository orderLineRepo) {
	
	this.orderLineRepo = orderLineRepo;
}



	// Get All categories 
	public List<OrderLine> getAllOrderLine(){
		return orderLineRepo.findAll();
	}

	
	
	//get OrderLine by Id
	public OrderLine getOrderLinetById(Long id) {
		Optional<OrderLine> optionalOrderLine = orderLineRepo.findById(id);
		if(optionalOrderLine.isPresent()) {
			return optionalOrderLine.get();
		}else {
			return 	null;
		}
			
	}
	
	
	
	// Create a OrderLine
	public OrderLine saveOrderLine(OrderLine OrderLine) {
		return orderLineRepo.save(OrderLine);
	}
	
	
	
	// update a OrderLine
	public OrderLine updateOrderLine(OrderLine OrderLine) {
		return orderLineRepo.save(OrderLine);
	}
	
	
	//delete OrderLine
	public void delete(Long id) { 
		orderLineRepo.deleteById(id);
	}
	

}
