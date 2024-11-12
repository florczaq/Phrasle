package com.phraser.server.enums;

public enum EXPIRATION_TIME {
    SIX_MONTHS( 6* 1000L * 60 * 60 * 24 * 30),
    ONE_MONTH( 1000L * 60 * 60 * 24 * 30),
    TWO_DAYS( 1000L * 60 * 60 * 24 * 2);

    private final long value;

    EXPIRATION_TIME(long value) {
        this.value = value;
    }

    public long getValue() {
        return value;
    }
}
