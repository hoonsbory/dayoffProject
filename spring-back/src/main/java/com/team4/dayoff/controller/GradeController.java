package com.team4.dayoff.controller;

import java.util.HashMap;
import java.util.Map;

import com.team4.dayoff.repository.GradeRepository;
import com.team4.dayoff.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * GradeController
 */
@CrossOrigin("*")
@RestController
public class GradeController {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/getGrade")
    public Map<String, Object> getGrade(Integer userId){
        Map<String, Object> map=new HashMap<String, Object>();

        map.put("grades",  gradeRepository.findAllByOrderByRate());
        map.put("userGrade", usersRepository.findById(userId).get().getGrade());
        map.put("accrue", usersRepository.findById(userId).get().getAccrue());

        return map;
    }
    
}