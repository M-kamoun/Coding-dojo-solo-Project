package com.app.products.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.products.models.Supplier;
import com.app.products.services.SupplierService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins="http://localhost:3000")
public class supplierController {
	
	private final SupplierService supplierServ;

	
	
	
	public supplierController(SupplierService supplierServ) {
		super();
		this.supplierServ = supplierServ;
	}




	@GetMapping("/suppliers")
	public ResponseEntity<List<Supplier>> getAllSuppliers() {
		return ResponseEntity.status(HttpStatus.OK).body(supplierServ.getAllSuppliers());
	}
	
	
	
	@GetMapping("/suppliers-pagination")
	public ResponseEntity<Page<Supplier>> getAllSuppliersWPagination(
			@RequestParam(defaultValue="0",required=false) int pageNumber,
			@RequestParam(defaultValue="5",required=false) int pageSize)
	{
		Page<Supplier> Suppliers = supplierServ.getAllSuppliersWPagination(pageNumber, pageSize);
		return ResponseEntity.status(HttpStatus.OK).body(Suppliers);
	}
	
	
	@GetMapping("/suppliers/{id}")
	public ResponseEntity<Supplier> getSupplierById(@PathVariable() Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(supplierServ.getSupplierstById(id));
	}
	
	
	@PostMapping("/suppliers/new")
	public ResponseEntity<Supplier> newSupplier( @RequestBody @Valid Supplier Supplier ){
		return ResponseEntity.status(HttpStatus.CREATED).body(supplierServ.saveSupplier(Supplier));
	}
	
	@PutMapping("suppliers/{id}/edit")
	public ResponseEntity<?> updateSupplier(@PathVariable Long id, @Valid @RequestBody Supplier Supplier) {
	    Optional<Supplier> updatedSupplier = supplierServ.updateSupplier(id, Supplier);

	    if (updatedSupplier.isPresent()) {
	        return ResponseEntity.ok(updatedSupplier.get()); 
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Supplier with ID " + id + " not found");
	    }
	}
	
	
	@DeleteMapping("suppliers/{id}/delete")
	public ResponseEntity<String> deleteSupplier(@PathVariable() Long id ){
		supplierServ.delete(id);
		return ResponseEntity.ok("supplier deleted successfully!");
	}
	
	

}
