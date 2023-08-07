package com.project2.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project2.models.AppUser;
import com.project2.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    UserService userService;

    // get all users in the database
    @GetMapping
    public ResponseEntity<List<AppUser>> findAllUsers() {
        List<AppUser> users = userService.findAllUsers();

        if(users == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<AppUser>>(users, HttpStatus.OK);
    }

    // get user by id
    @GetMapping("/userById/{userId}")
    public ResponseEntity<AppUser> findByUserId(@PathVariable long userId) {
        AppUser user = userService.findById(userId);
        return new ResponseEntity<AppUser>(user, HttpStatus.OK);
    }

    // post new user
    @PostMapping("/newUser")
        public ResponseEntity<AppUser> createUser(@RequestBody AppUser user) {
        AppUser newUser = userService.createUser(user);
        return new ResponseEntity<AppUser>(newUser, HttpStatus.CREATED);
    }

    // update user by id
    @PutMapping("/updateUser")
    public ResponseEntity<AppUser> updateUser(@RequestBody AppUser user) {
        AppUser updatedUser = userService.updateUser(user);
        return new ResponseEntity<AppUser>(updatedUser, HttpStatus.OK);
    }

    // delete by id
    @DeleteMapping("/deleteById/{userId}")
    public ResponseEntity<AppUser> deleteUse(@PathVariable long userId) {
        AppUser user = userService.findById(userId);
        userService.deleteUser(user);
        return new ResponseEntity<AppUser>(HttpStatus.NO_CONTENT);
    }
}
