package com.phraser.server.phrase.group;

import com.phraser.server.phrase.group.object.Group;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.rmi.NoSuchObjectException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository repository;

    public Group getGroup(int id, String userId) throws  NoSuchObjectException{
        var response = repository.findByIdAndUserId(id, userId);
        if(response.isEmpty())
            throw new NoSuchObjectException("No group assigned to this id");
        return response.get();
    }

    public void addGroup(Group group) throws Exception {
        try{
            repository.save(group);
        }catch (Exception e){
            throw new Exception("Couldn't create new group record.");
        }
    }

    public List<Group> getListOfUserGroups(String userId){
        try {
            return repository.findByUserId(userId);
        }catch (Exception e){
            return new ArrayList<>();
        }
    }

}

