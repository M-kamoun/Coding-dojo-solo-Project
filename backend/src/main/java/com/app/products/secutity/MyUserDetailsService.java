package com.app.products.secutity;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.products.repositories.UserRepository;

@Service

public class MyUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepo;
	
	

	public MyUserDetailsService(UserRepository userRepo) {
		super();
		this.userRepo = userRepo;
	}



	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		
		return userRepo.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User NOT FOUND WITH EMAIL " +email ) );
	}

}
