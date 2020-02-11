package com.team4.dayoff.repository;

import java.util.List;

import com.team4.dayoff.entity.WithdrawHistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * WithdrawHistoryRepository
 */
public interface WithdrawHistoryRepository extends JpaRepository<WithdrawHistory,Integer> {
    
    @Query(value="SELECT sex, (TIMESTAMPDIFF(year, birth, DATE(CONCAT(:yearMonth,'-01'))) DIV 10)*10  ageGroup, COUNT(IF(DATE_FORMAT(signUpDate,'%Y-%m')=:yearMonth, u.id, null)) signUp, COUNT(IF(DATE_FORMAT(withdrawDate,'%Y-%m')=:yearMonth, u.id, null)) withdraw FROM users u LEFT JOIN withdrawHistory w ON w.userId=u.id GROUP BY sex, ageGroup HAVING ageGroup>=10 AND ageGroup<=60 ORDER BY ageGroup, sex",nativeQuery=true)
    List<String[]> countUserSexAndAgeGroupByYearMonth(@Param("yearMonth") String yearMonth);

    @Query(value="SELECT * FROM ( "+
        "(SELECT u.month, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM "+
        "(SELECT DATE_FORMAT(signUpDate,'%m') month, COUNT(*) signUp FROM users WHERE DATE_FORMAT(signUpDate,'%Y')=:year GROUP BY month) u "+
        "LEFT JOIN "+ 
        "(SELECT DATE_FORMAT(withdrawDate,'%m') month, COUNT(*) withdraw FROM withdrawHistory WHERE DATE_FORMAT(withdrawDate,'%Y')=:year GROUP BY month) w "+
        "ON w.month=u.month "+
        ") "+
        "UNION "+
        "(SELECT w.month, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM "+
        "(SELECT DATE_FORMAT(signUpDate,'%m') month, COUNT(*) signUp FROM users WHERE DATE_FORMAT(signUpDate,'%Y')=:year GROUP BY month) u "+
        "RIGHT JOIN "+
        "(SELECT DATE_FORMAT(withdrawDate,'%m') month, COUNT(*) withdraw FROM withdrawHistory WHERE DATE_FORMAT(withdrawDate,'%Y')=:year GROUP BY month) w "+
        "ON w.month=u.month "+
        ") "+
        ") un ORDER BY month",nativeQuery = true)
    List<String[]> countUserMonthByYear(@Param("year") String year);

    @Query(value="SELECT * FROM ( "+
        "(SELECT u.year, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM (SELECT DATE_FORMAT(signUpDate,'%Y') year, COUNT(*) signUp FROM users GROUP BY year) u LEFT JOIN (SELECT DATE_FORMAT(withdrawDate,'%Y') year, COUNT(*) withdraw FROM withdrawHistory GROUP BY year) w ON w.year=u.year "+
        ") "+
        "UNION "+
        "(SELECT u.year, IFNULL(signUp,0) signUp, IFNULL(withdraw,0) withdraw FROM (SELECT DATE_FORMAT(signUpDate,'%Y') year, COUNT(*) signUp FROM users GROUP BY year) u RIGHT JOIN (SELECT DATE_FORMAT(withdrawDate,'%Y') year, COUNT(*) withdraw FROM withdrawHistory GROUP BY year) w ON w.year=u.year "+
        ") "+
        ") un ORDER BY year",nativeQuery=true)
    List<String[]> countUserByYear();

    @Query(value="SELECT COUNT(*)-IFNULL(COUNT(w.userId),0) users, IFNULL(COUNT(w.userId),0) withdrawals FROM users u LEFT JOIN withdrawHistory w ON w.userId=u.id",nativeQuery = true)
    List<String[]> countAllUser();

    @Query(value="SELECT c.content reason, IFNULL(COUNT(w.userId),0) count FROM (SELECT * FROM withdrawHistory WHERE DATE_FORMAT(withdrawDate,'%Y')=:year) w RIGHT JOIN (SELECT * FROM code WHERE code LIKE '02%') c ON w.code=c.code  GROUP BY c.code",nativeQuery = true)
    List<String[]> countReasonByYear(@Param("year") String year);

    @Query(value="SELECT yearMonth FROM ( "+
        "SELECT DISTINCT DATE_FORMAT(signUpDate,'%Y-%m') yearMonth FROM users  WHERE (TIMESTAMPDIFF(year, birth, DATE(CONCAT(DATE_FORMAT(signUpDate,'%Y-%m'),'-01'))) DIV 10)*10 BETWEEN 10 AND 60 "+
        "UNION "+
        "SELECT DISTINCT DATE_FORMAT(withdrawDate,'%Y-%m') yearMonth FROM withdrawHistory LEFT JOIN users ON withdrawHistory.userId=users.id WHERE (TIMESTAMPDIFF(year, birth, DATE(CONCAT(DATE_FORMAT(withdrawDate,'%Y-%m'),'-01'))) DIV 10)*10 BETWEEN 10 AND 60) u ORDER BY yearMonth DESC",nativeQuery = true)
    List<String> findYearMonthOfUsers();

    @Query(value="SELECT year FROM ( "+
        "SELECT DISTINCT DATE_FORMAT(signUpDate,'%Y') year FROM users "+
        "UNION "+
        "SELECT DISTINCT DATE_FORMAT(withdrawDate,'%Y') year FROM withdrawHistory ) u ORDER BY year DESC",nativeQuery = true)
    List<String> findYearOfUsers();

    @Query(value="SELECT DISTINCT DATE_FORMAT(withdrawDate,'%Y') year FROM withdrawHistory ORDER BY year DESC",nativeQuery = true)
    List<String> findYearOfWithdraws();
}