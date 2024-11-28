package com.app.products.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.products.models.User;
import com.app.products.services.UserService;

import jakarta.validation.Valid;

@RestController

@CrossOrigin(origins="http://localhost:3000")
public class UserController {
	
	private final UserService userServ;

	public UserController(UserService userServ) {
	
		this.userServ= userServ;
	}
	
	
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllusers() {
		return ResponseEntity.status(HttpStatus.OK).body(userServ.getAllusers());
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable() Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(userServ.getUsersById(id));
	}
	
	
	 @PostMapping("/register")
	    public ResponseEntity<User> newUser(@RequestBody() @Valid User user){
	        User newUser = userServ.saveUser(user);
	        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
	    }
	
	@PutMapping("users/{id}/edit")
	public ResponseEntity<User> updateUser(@PathVariable() Long id , @RequestBody User User ){
		User.setId(id);
		return ResponseEntity.status(HttpStatus.OK).body(userServ.updateUser(User));
	}
	
	@DeleteMapping("users/{id}/delete")
	public ResponseEntity<String> deleteUser(@PathVariable() Long id ){
		userServ.delete(id);
		return ResponseEntity.ok("User deleted successfully!");
	}
	

}
