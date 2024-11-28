package com.app.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.products.models.Order;
import com.app.products.models.Supplier;
import com.app.products.repositories.OrderRepository;


@Service
public class OrderService {
	
private final OrderRepository orderRepo;


	
	
	
	public OrderService (OrderRepository orderRepo) {
		
		this.orderRepo= orderRepo;
	}

	
	public List<Order> getAllOrders(){
		return orderRepo.findAll();
	}
	
	// Get All with Pagination
		public Page<Order> getAllOrdersWPagination(int pageNumber,int pageSize) {
			Pageable pageable = PageRequest.of(pageNumber, pageSize,Sort.by(Sort.Direction.DESC, "createdAt"));
			return orderRepo.findAll(pageable);
		}

	
	
	public Order getOrderstById(Long id) {
		Optional<Order> optionalOrder = orderRepo.findById(id);
		if(optionalOrder.isPresent()) {
			return optionalOrder.get();
		}else {
			return 	null;
		}
			
	}
	
	
	
	
	public Order saveOrder(Order Order) {
		return orderRepo.save(Order);
	}
	
	
	
	
	public Optional<Order> updateOrder(long id, Order order) {
	    return orderRepo.findById(id).map(existingOrder -> {
	        existingOrder.setCode(order.getCode());
	        existingOrder.setOrderDate(order.getOrderDate());
	        existingOrder.setStatus(order.getStatus());
	   
	        
	       
	       

	        return orderRepo.save(existingOrder);
	    });
	}
	
	
	
	public void delete(Long id) { 
		orderRepo.deleteById(id);
	}
	


}
