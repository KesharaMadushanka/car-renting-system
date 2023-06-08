package com.example.carrentingsystem.service;

import com.example.carrentingsystem.entity.Vehicle;

import java.util.List;
import java.util.Optional;

public interface VehicleServiceImpl {
    List<Vehicle> getVehicleDetails();
    Vehicle addVehicle(Vehicle vehicle);
    void deleteVehicle(String id);
    Vehicle getVehicleById(String id);
    Vehicle updateVehicle(Vehicle vehicle);
}
