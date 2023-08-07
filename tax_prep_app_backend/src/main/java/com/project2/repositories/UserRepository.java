package com.project2.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project2.models.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    public Optional<AppUser> findByUsername(String username);
}
