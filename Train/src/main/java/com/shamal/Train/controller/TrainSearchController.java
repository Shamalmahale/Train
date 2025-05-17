package com.shamal.Train.controller;

import com.shamal.Train.entity.TrainSchedule;
import com.shamal.Train.service.TrainSearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin
public class TrainSearchController {
    private TrainSearchService trainSearchService;
    private TrainSearchController(TrainSearchService trainSearchService){
        this.trainSearchService = trainSearchService;
    }

    @GetMapping("/by-code")
    public List<TrainSchedule> findTrainByStationCode(@RequestParam String sourceCode, @RequestParam String destinationCode){
        return trainSearchService.findTrainByStationCode(sourceCode.toUpperCase(),destinationCode.toUpperCase());
    }
    @GetMapping("/by_name")
    public List<TrainSchedule> findTrainByStationName(@RequestParam String sourceName, @RequestParam String destinationName){
        return trainSearchService.findTrainByStationName(sourceName.toUpperCase(),destinationName.toUpperCase());
    }
}
