package com.example.XoGame.Repositories;

import com.example.XoGame.Entities.GameTurn;
import com.example.XoGame.Entities.PlayerHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameTurnRepository extends JpaRepository<GameTurn,Integer> {

    @Query("select gt from GameTurn gt where gt.historyId = :historyId and gt.type = :type")
    GameTurn findByHistoryIdAndType(Integer historyId, char type);
}
