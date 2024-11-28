package com.app.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.products.models.StockMvt;
import com.app.products.repositories.StockMvtRepository;

@Service
public class StockMvtService {
	
public StockMvtService(StockMvtRepository mvtRepo) {
		super();
		this.mvtRepo = mvtRepo;
	}


private final StockMvtRepository mvtRepo;

	
	
	
	

	// Get All categories 
	public List<StockMvt> getAllMvt(){
		return mvtRepo.findAll();
	}

	
	
	//get StockMvt by Id
	public StockMvt getMvtById(Long id) {
		Optional<StockMvt> optionalStockMvt = mvtRepo.findById(id);
		if(optionalStockMvt.isPresent()) {
			return optionalStockMvt.get();
		}else {
			return 	null;
		}
			
	}
	
	
	
	// Create a StockMvt
	public StockMvt saveStockMvt(StockMvt StockMvt) {
		return mvtRepo.save(StockMvt);
	}
	
	
	
	// update a StockMvt
	public StockMvt updateStockMvt(StockMvt StockMvt) {
		return mvtRepo.save(StockMvt);
	}
	
	
	//delete StockMvt
	public void delete(Long id) { 
		mvtRepo.deleteById(id);
	}
	

}
