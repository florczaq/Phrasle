package com.phraser.server.phrase.group;

import com.phraser.server.phrase.PhraseRepository;
import com.phraser.server.phrase.group.object.Group;
import com.phraser.server.phrase.group.object.GroupResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.rmi.NoSuchObjectException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final PhraseRepository phraseRepository;
    private final GroupRepository repository;

    public Group getGroup(int id, String userId) throws NoSuchObjectException {
        var response = repository.findByIdAndUserId(id, userId);
        if (response.isEmpty())
            throw new NoSuchObjectException("No group assigned to this id");
        return response.get();
    }

    public void addGroup(Group group) throws Exception {
        try {
            repository.save(group);
        } catch (Exception e) {
            throw new Exception("Couldn't create new group record.");
        }
    }

    public int getGroupSize(String userId, int groupId) {
        try {
            return phraseRepository.findByUserIdAndGroupId(userId, groupId).size();
        } catch (Exception e) {
            return -1;
        }
    }

    public List<Group> getListOfUserGroups(String userId) {
        try {
            return repository.findByUserId(userId);
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public void deleteGroup(Group group) throws Exception{
        try {
            repository.deleteGroup(group.getId());
        }catch (Exception e){
            throw new Exception("Couldn't delete this group.");
        }
    }

}

