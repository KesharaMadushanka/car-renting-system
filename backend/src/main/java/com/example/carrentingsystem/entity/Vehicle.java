package com.example.carrentingsystem.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vehicle")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Vehicle {
    @Id
    private String vehicleID;
    private String vehicleNumber;
    private String vehicleBrand;
    private String vehicleModel;
    private String vehicleChassisNumber;

}
