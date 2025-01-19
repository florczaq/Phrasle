package com.phraser.server.phrase.group.object;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class GroupResponse {
    private final Group group;
    private int size;

}
