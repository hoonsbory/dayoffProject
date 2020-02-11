package com.team4.dayoff.repository;

import com.team4.dayoff.entity.Users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

    @Query(value="SELECT * FROM users WHERE role='user'",nativeQuery=true)
    Page<Users> findAllRoleNotUser(Pageable pageable);

    Page<Users> findAll(Pageable pageable);

    Page<Users> findByName(Pageable pageable, String name);

    Page<Users> findById(Pageable pageable, int id);

    @Query(value="SELECT * FROM users WHERE role='user' AND name=:name",nativeQuery=true)
    Page<Users> findByNameRoleNotUser(Pageable pageable, String name);

    @Query(value="select * from users where socialId like %:socialId% and role = 'user'" , nativeQuery = true)
    Users findBySocialId2(@Param("socialId") String socialId);

    Users findBySocialIdAndRoleNot(String socialId, String role);

    Users findBySocialIdAndRole(String socialId, String role);
    
    @Transactional
    @Modifying
	@Query("UPDATE Users SET role='withdraw', accessToken=null, refreshToken=null WHERE id= :userId")
    void withdrawUser(int userId);
    Users findById(int userId);
    @Transactional
    @Modifying
    @Query("update Users set totalEmoney=:totalEmoney where id=:userId")
    void userEmoney(int totalEmoney, int userId);
}
