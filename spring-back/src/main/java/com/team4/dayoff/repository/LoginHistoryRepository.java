package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.LoginHistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * LoginHistoryRepository
 */
public interface LoginHistoryRepository extends JpaRepository<LoginHistory,Integer> {

    @Query(value="SELECT sex, (TIMESTAMPDIFF(year, birth, DATE(CONCAT(:yearMonth,'-01'))) DIV 10)*10  ageGroup, COUNT(userId) login FROM users u INNER JOIN (SELECT DISTINCT userId, DATE(loginDate) loginDate FROM loginHistory) l ON l.userId=u.id WHERE DATE_FORMAT(loginDate,'%Y-%m')=:yearMonth GROUP BY sex, ageGroup HAVING ageGroup>=10 AND ageGroup<=60 ORDER BY ageGroup, sex",nativeQuery = true)
    List<String[]> countLoginSexAndAgeGroupByYearMonth(String yearMonth);

    @Query(value="SELECT DATE_FORMAT(loginDate,'%m') month, COUNT(userId) login FROM (SELECT DISTINCT userId, DATE(loginDate) loginDate FROM loginHistory) l WHERE DATE_FORMAT(loginDate,'%Y')=:year GROUP BY month ORDER BY month",nativeQuery = true)
    List<String[]> countLoginMonthByYear(String year);

    @Query(value="SELECT DATE_FORMAT(loginDate,'%Y') year, COUNT(userId) login FROM (SELECT DISTINCT userId, DATE(loginDate) loginDate FROM loginHistory) l GROUP BY DATE_FORMAT(loginDate,'%Y') ORDER BY year",nativeQuery = true)
    List<String[]> countLoginYear();

    @Query(value="SELECT DISTINCT DATE_FORMAT(loginDate,'%Y-%m') yearMonth FROM loginHistory LEFT JOIN users ON loginHistory.userId=users.id WHERE (TIMESTAMPDIFF(year, birth, DATE(CONCAT(DATE_FORMAT(loginDate,'%Y-%m'),'-01'))) DIV 10)*10 BETWEEN 10 AND 60 ORDER BY yearMonth DESC",nativeQuery = true)
    List<String> findYearMonth();

    @Query(value="SELECT DISTINCT DATE_FORMAT(loginDate,'%Y') year FROM loginHistory ORDER BY year DESC",nativeQuery = true)
    List<String> findYear();
}