package com.app.products.controllers;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


import com.app.products.models.StockMvt;
import com.app.products.services.StockMvtService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins="http://localhost:3000")
public class StockMvtController {
	
	private final StockMvtService mvtServ;
	
	
	

	public StockMvtController(StockMvtService mvtServ) {
		super();
		this.mvtServ = mvtServ;
	}






	@GetMapping("/mvt-stock")
	public ResponseEntity<List<StockMvt>> getAllMvt() {
		return ResponseEntity.status(HttpStatus.OK).body(mvtServ.getAllMvt());
	}
	
	
	
	
	
	
	@GetMapping("/mvt-stock/{id}")
	public ResponseEntity<StockMvt> getMvtById(@PathVariable() Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(mvtServ.getMvtById(id));
	}
	
	
	@PostMapping("/mvt-stock/new")
	public ResponseEntity<StockMvt> neworder( @RequestBody @Valid StockMvt stockMvt ){
		return ResponseEntity.status(HttpStatus.CREATED).body(mvtServ.saveStockMvt(stockMvt));
	}
	

}
