package com.example.XoGame.DTOS;

import java.sql.Timestamp;

public class HistoryDTO {
    private String name;
    private Integer size;
    private char character;
    private char firstTurn;
    private char winner;
    private Timestamp createdDate;
    private TurnDTO playerX;
    private TurnDTO playerO;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public char getCharacter() {
        return character;
    }

    public void setCharacter(char character) {
        this.character = character;
    }

    public char getFirstTurn() {
        return firstTurn;
    }

    public void setFirstTurn(char firstTurn) {
        this.firstTurn = firstTurn;
    }

    public char getWinner() {
        return winner;
    }

    public void setWinner(char winner) {
        this.winner = winner;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    public TurnDTO getPlayerX() {
        return playerX;
    }

    public void setPlayerX(TurnDTO playerX) {
        this.playerX = playerX;
    }

    public TurnDTO getPlayerO() {
        return playerO;
    }

    public void setPlayerO(TurnDTO playerO) {
        this.playerO = playerO;
    }
}
