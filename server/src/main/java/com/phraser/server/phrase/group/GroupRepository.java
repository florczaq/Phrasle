package com.phraser.server.phrase.group;

import com.phraser.server.phrase.group.object.Group;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    Optional<Group> findByIdAndUserId(int id, String userId);
    List<Group> findByUserId(String userId);


    @Transactional
    @Modifying
    @Query("delete from Group g where g.id=:id")
    void deleteGroup(int id);
}
