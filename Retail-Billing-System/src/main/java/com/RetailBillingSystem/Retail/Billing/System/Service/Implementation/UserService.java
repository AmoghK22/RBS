package com.RetailBillingSystem.Retail.Billing.System.Service.Implementation;

import com.RetailBillingSystem.Retail.Billing.System.Entity.UserEntity;
import com.RetailBillingSystem.Retail.Billing.System.io.UserRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.UserResponse;
import com.RetailBillingSystem.Retail.Billing.System.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    public UserResponse register(UserRequest userRequest) {
        UserEntity user = UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .name(userRequest.getName())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(userRequest.getRole())
                .build();
        UserEntity savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    // Save a new user to the DB
    public UserEntity save(UserEntity user) {
        return userRepository.save(user);
    }

    // Find all users
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Find user by ID
    public UserEntity findByUserId(String userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }

    // Delete user by ID
    public void deleteByUserId(String userId) {
        userRepository.deleteByUserId(userId);
    }

    // Other methods as needed (e.g., find by ID, update, etc.)
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public UserResponse mapToResponse(UserEntity user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword()) // Note: In real app, don't return password
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}