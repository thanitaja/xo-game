package com.example.XoGame.Entities;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "player_histories")
public class PlayerHistory {
    private Integer id;
    private String name;
    private Integer size;
    private char character;
    private char firstTurn;
    private char winner;
    private Timestamp createdDate;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "size")
    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    @Column(name = "character_player")
    public char getCharacter() {
        return character;
    }

    public void setCharacter(char character) {
        this.character = character;
    }

    @Column(name = "first_turn")
    public char getFirstTurn() {
        return firstTurn;
    }

    public void setFirstTurn(char firstTurn) {
        this.firstTurn = firstTurn;
    }

    @Column(name = "winner")
    public char getWinner() {
        return winner;
    }

    public void setWinner(char winner) {
        this.winner = winner;
    }

    @Column(name = "created_date")
    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }
}
