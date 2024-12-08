package com.phraser.server.phrase.group;


import com.phraser.server.phrase.group.object.Group;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.NoSuchObjectException;
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
    public ResponseEntity<List<Group>> getListOfUserGroups (@RequestParam(name = "uid") String userId){
        return ResponseEntity.ok(service.getListOfUserGroups(userId));
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
}
/*TODO
 * delte group
 * update
 */