package com.team4.dayoff.repository;

import com.team4.dayoff.entity.Stores;


import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;


@Repository
public interface StoresRepository extends JpaRepository<Stores, Integer> {

   
    Stores findByname(String name);
}