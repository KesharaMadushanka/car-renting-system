package com.example.carrentingsystem.repository;

import com.example.carrentingsystem.entity.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface VehicleRepository extends MongoRepository<Vehicle, String> {

}
