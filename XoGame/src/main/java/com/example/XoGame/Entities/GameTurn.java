package com.example.XoGame.Entities;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "game_turn")
public class GameTurn {
    private Integer id;
    private Integer historyId;
    private String xPoint;
    private String yPoint;
    private char type;


    @Id
    @Column(name = "id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "historyId")
    public Integer getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Integer historyId) {
        this.historyId = historyId;
    }

    @Column(name = "x_point")
    public String getxPoint() {
        return xPoint;
    }

    public void setxPoint(String xPoint) {
        this.xPoint = xPoint;
    }

    @Column(name = "y_point")
    public String getyPoint() {
        return yPoint;
    }

    public void setyPoint(String yPoint) {
        this.yPoint = yPoint;
    }

    @Column(name = "type")
    public char getType() {
        return type;
    }

    public void setType(char type) {
        this.type = type;
    }
}
