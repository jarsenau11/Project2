package com.project2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project2.repositories.UserRepository;
import com.project2.models.AppUser;


@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    // Retrieves all users
    public List<AppUser> findAllUsers() {
        return userRepository.findAll();
    }

    // get user by id
    public AppUser findById(long userId) {
        Optional<AppUser> user = userRepository.findById(userId);
        if(user.isPresent()) {
            return user.get();
        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username + " not found."));
        return user;
    }

    // add new user to the database
    public AppUser createUser(AppUser user) {
        Optional<AppUser> foundUser = userRepository.findByUsername(user.getUsername());
        if(foundUser.isPresent()) {
            throw new RuntimeException("That username is taken");
        }
        else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            user.setRole("ROLE_USER");

            return userRepository.save(user);
        }
    }

    // update an existing user in the database
    public AppUser updateUser(AppUser user) {
        return userRepository.save(user);
    }

    // delete a user from the database
    public void deleteUser(AppUser user) {
        userRepository.delete(user);
    }

}
