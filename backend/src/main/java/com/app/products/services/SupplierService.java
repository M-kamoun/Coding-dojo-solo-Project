package com.app.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.products.models.Product;
import com.app.products.models.Supplier;
import com.app.products.repositories.SupplierRepository;

@Service
public class SupplierService {
	
private final SupplierRepository supplierRepo;


	
	
	
	public SupplierService (SupplierRepository supplierRepo) {
		super();
		this.supplierRepo= supplierRepo;
	}

	
	public List<Supplier> getAllSuppliers(){
		return supplierRepo.findAll();
	}
	
	// Get All with Pagination
		public Page<Supplier> getAllSuppliersWPagination(int pageNumber,int pageSize) {
			Pageable pageable = PageRequest.of(pageNumber, pageSize,Sort.by(Sort.Direction.DESC, "createdAt"));
			return supplierRepo.findAll(pageable);
		}

	
	
	public Supplier getSupplierstById(Long id) {
		Optional<Supplier> optionalSupplier = supplierRepo.findById(id);
		if(optionalSupplier.isPresent()) {
			return optionalSupplier.get();
		}else {
			return 	null;
		}
			
	}
	
	
	
	
	public Supplier saveSupplier(Supplier supplier) {
		return supplierRepo.save(supplier);
	}
	
	
	
	
	public Optional<Supplier> updateSupplier(long id, Supplier supplier) {
	    return supplierRepo.findById(id).map(existingSupplier -> {
	        existingSupplier.setName(supplier.getName());
	        existingSupplier.setAddress(existingSupplier.getAddress());
	        existingSupplier.setEmail(supplier.getEmail());
	       

	        return supplierRepo.save(existingSupplier);
	    });
	}
	
	
	
	public void delete(Long id) { 
		supplierRepo.deleteById(id);
	}
	

}
