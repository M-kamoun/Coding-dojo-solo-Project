package com.app.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.products.models.User;
import com.app.products.repositories.UserRepository;

@Service
public class UserService {
	
private final UserRepository userRepo;
private final BCryptPasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepo) {
	
	this.userRepo = userRepo;
	this.passwordEncoder = new BCryptPasswordEncoder();
}

	


	// Get All categories 
	public List<User> getAllusers(){
		return userRepo.findAll();
	}

	
	
	//get User by Id
	public User getUsersById(Long id) {
		Optional<User> optionalUser = userRepo.findById(id);
		if(optionalUser.isPresent()) {
			return optionalUser.get();
		}else {
			return 	null;
		}
			
	}
	
	
	
	// Create a User
	public User saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepo.save(user);
	}
	
	
	
	// update a User
	public User updateUser(User user) {
		return userRepo.save(user);
	}
	
	
	//delete User
	public void delete(Long id) { 
		userRepo.deleteById(id);
	}
	

}
