package com.example.carrentingsystem.controller;

import com.example.carrentingsystem.entity.Vehicle;
import com.example.carrentingsystem.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {
    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    //get all vehicles
    @GetMapping()
    public ResponseEntity<List<Vehicle>> getVehicle() {
        List<Vehicle> vehicles = vehicleService.getVehicleDetails();

        if (vehicles != null) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //get vehicle by ID
    @GetMapping("{id}")
    public ResponseEntity<Vehicle> getVehicleByID(@PathVariable String id){
        try {
            Vehicle vehicle = vehicleService.getVehicleById(id);
            if(vehicle == null){
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(vehicle);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }


    //add new vehicle
    @PostMapping()
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
        try {
            Vehicle newVehicle = vehicleService.addVehicle(vehicle);
            return ResponseEntity.ok(newVehicle);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //delete vehicle
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String id) {
        Vehicle vehicle = vehicleService.getVehicleById(id);
        if (vehicle != null) {
            try {
                vehicleService.deleteVehicle(id);
                return ResponseEntity.noContent().build();
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        } else {
            return ResponseEntity.notFound().build();

        }
    }

    //update vehicle details
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable String id, @RequestBody Vehicle vehicle) {
        Vehicle vehicleDetails = vehicleService.getVehicleById(id);
        if (vehicleDetails == null) {
            return ResponseEntity.notFound().build();
        }
        vehicleDetails.setVehicleBrand(vehicle.getVehicleBrand());
        vehicleDetails.setVehicleModel(vehicle.getVehicleModel());
        vehicleDetails.setVehicleNumber(vehicle.getVehicleNumber());
        vehicleDetails.setVehicleChassisNumber(vehicle.getVehicleChassisNumber());

        try {
            vehicleService.updateVehicle(vehicleDetails);
            return ResponseEntity.ok(vehicleDetails);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }


}
