package com.shamal.Train.controller;

import com.shamal.Train.entity.Station;
import com.shamal.Train.entity.Train;
import com.shamal.Train.entity.TrainSchedule;
import com.shamal.Train.repo.StationRepository;
import com.shamal.Train.repo.TrainRepository;
import com.shamal.Train.repo.TrainScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
public class Test {
    @Autowired
    StationRepository stationRepository;

    @Autowired
    TrainRepository trainRepository;

    @Autowired
    TrainScheduleRepository trainScheduleRepository;

    @GetMapping
    public void test(){
        Station delhi=new Station(null,"New Delhi","NDLS");
        Station mumbai=new Station(null,"Mumbai central","CST");
        Station kolkata=new Station(null,"Kolkata","KOAA");
        Station chennai=new Station(null,"Chennai Central","MAS");

        stationRepository.saveAll(List.of(delhi,mumbai,kolkata,chennai));

        Train rajdhani = new Train(null,"Rajdhani Express","12306",null);
        Train duranto = new Train(null,"Duranto Express","12260",null);
        Train shatabdi = new Train(null,"Shatabdi Express","12043",null);

        trainRepository.saveAll(List.of(rajdhani,duranto,shatabdi));

        TrainSchedule sc1 = new TrainSchedule(null,rajdhani,delhi,mumbai,"06:00","14:00");
        TrainSchedule sc2 = new TrainSchedule(null,duranto,mumbai,kolkata,"08:00","21:00");
        TrainSchedule sc3 = new TrainSchedule(null,shatabdi,kolkata,chennai,"11:30:00","19:00");

        trainScheduleRepository.saveAll(List.of(sc1,sc2,sc3));

        System.out.println("Data inserted in database");
    }
}

