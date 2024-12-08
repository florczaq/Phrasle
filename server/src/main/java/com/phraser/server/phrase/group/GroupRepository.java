package com.phraser.server.phrase.group;

import com.phraser.server.phrase.group.object.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    Optional<Group> findByIdAndUserId(int id, String userId);
    List<Group> findByUserId(String userId);
}
