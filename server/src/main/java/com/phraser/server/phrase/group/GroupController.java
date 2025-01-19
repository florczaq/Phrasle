package com.phraser.server.phrase.group;


import com.phraser.server.phrase.group.object.Group;
import com.phraser.server.phrase.group.object.GroupResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.NoSuchObjectException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/phrase/group")
public class GroupController {
    private final GroupService service;

    @GetMapping
    public ResponseEntity<Group> getGroup(@RequestParam(name = "uid") String userId, @RequestParam(name = "i") int id) {
        try {
            return ResponseEntity.ok(service.getGroup(id, userId));
        } catch (NoSuchObjectException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Group>> getListOfUserGroups(@RequestParam(name = "uid") String userId) {
        try {
            return ResponseEntity.ok(service.getListOfUserGroups(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list/details")
    public ResponseEntity<List<GroupResponse>> getListOfUserGroupsDetails(@RequestParam(name = "uid") String userId) {
        List<GroupResponse> groupResponses = new ArrayList<>();
        try {
            service.getListOfUserGroups(userId).forEach(item -> groupResponses.add(new GroupResponse(item, service.getGroupSize(item.getUserId(), item.getId()))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(groupResponses);
    }

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addGroup(@RequestBody Group group) {
        try {
            service.addGroup(group);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<HttpStatus> deleteGroup(@RequestBody Group group) {
        try {
            service.deleteGroup(group);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
/*TODO
 * update
 */