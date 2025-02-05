package com.phraser.server.games.memoryGame;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class MemoryGameRequest {
    @Getter
    private final String userId;
    @Getter
    private final int maxAmount;
    @Getter
    private final int groupId;
    @Getter
    private final boolean starred;
}
