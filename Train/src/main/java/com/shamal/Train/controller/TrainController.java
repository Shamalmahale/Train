package com.shamal.Train.controller;

import com.shamal.Train.entity.Train;
import com.shamal.Train.service.TrainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trains")
public class TrainController {
    private TrainService trainService;

    public TrainController(TrainService trainService){
        this.trainService=trainService;
    }
    @GetMapping
    public List<Train>getAllTrains(){
        return trainService.getAllTrains();
    }

    @PostMapping
    public Train addTrain(@RequestBody Train train){
       return this.trainService.addTrain(train);
    }
}
