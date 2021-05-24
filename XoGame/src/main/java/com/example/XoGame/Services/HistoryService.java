package com.example.XoGame.Services;

import com.example.XoGame.DTOS.HistoryDTO;
import com.example.XoGame.DTOS.TurnDTO;
import com.example.XoGame.Entities.GameTurn;
import com.example.XoGame.Entities.PlayerHistory;
import com.example.XoGame.Repositories.GameTurnRepository;
import com.example.XoGame.Repositories.PlayerHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class HistoryService {
    @Autowired
    private PlayerHistoryRepository playerHistoryRepository;

    @Autowired
    private GameTurnRepository gameTurnRepository;

    public List<PlayerHistory> getAll() {
        List<HistoryDTO> historyDTOS = new ArrayList<>();
        List<PlayerHistory> playerHistories = playerHistoryRepository.findAll();

        return playerHistories;
    }

    public void saveHistory(HistoryDTO historyDTO) {
        PlayerHistory playerHistory = new PlayerHistory();
        playerHistory.setName(historyDTO.getName());
        playerHistory.setCharacter(historyDTO.getCharacter());
        playerHistory.setFirstTurn(historyDTO.getFirstTurn());
        playerHistory.setSize(historyDTO.getSize());
        playerHistory.setWinner(historyDTO.getWinner());
        playerHistory.setCreatedDate(new Timestamp(new Date().getTime()));
        playerHistoryRepository.saveAndFlush(playerHistory);

        TurnDTO turnX = historyDTO.getPlayerX();
        TurnDTO turnO = historyDTO.getPlayerO();

        GameTurn gameTurnX = new GameTurn();
        gameTurnX.setHistoryId(playerHistory.getId());
        gameTurnX.setxPoint(convertArrDoubleToString(turnX.getX()));
        gameTurnX.setyPoint(convertArrDoubleToString(turnX.getY()));
        gameTurnX.setType('X');
        gameTurnRepository.saveAndFlush(gameTurnX);

        GameTurn gameTurnO = new GameTurn();
        gameTurnO.setHistoryId(playerHistory.getId());
        gameTurnO.setxPoint(convertArrDoubleToString(turnO.getX()));
        gameTurnO.setyPoint(convertArrDoubleToString(turnO.getY()));
        gameTurnO.setType('O');
        gameTurnRepository.saveAndFlush(gameTurnO);

    }

    private String convertArrDoubleToString(double[] point){
        String pointStr = "";
        for (int i = 0; i < point.length; i++) {
            if(i == point.length) {
                pointStr += point[i];
            } else {
                pointStr += point[i] + "|";
            }
        }

        return pointStr;
    }

    public HistoryDTO getHistory(Integer id) {
        HistoryDTO historyDTO = new HistoryDTO();
        Optional<PlayerHistory> playerHistory = playerHistoryRepository.findById(id);
        if(playerHistory.isPresent()) {
            PlayerHistory history = playerHistory.get();
            historyDTO.setName(history.getName());
            historyDTO.setSize(history.getSize());
            historyDTO.setCharacter(history.getCharacter());
            historyDTO.setFirstTurn(history.getFirstTurn());
            historyDTO.setWinner(history.getWinner());

            // turn x
            GameTurn xTurn = gameTurnRepository.findByHistoryIdAndType(history.getId(), 'X');
            historyDTO.setPlayerX(setTurn(xTurn));

            // turn x
            GameTurn oTurn = gameTurnRepository.findByHistoryIdAndType(history.getId(), 'O');
            historyDTO.setPlayerO(setTurn(oTurn));

        }

        return historyDTO;
    }

    private TurnDTO setTurn(GameTurn turn){
        TurnDTO turnDTO = new TurnDTO();
        turnDTO.setX(turn.getxPoint().isEmpty() ? new double[0] : Arrays.stream(turn.getxPoint().split("\\|")).mapToDouble(Double::parseDouble).toArray());
        turnDTO.setY(turn.getyPoint().isEmpty() ? new double[0] : Arrays.stream(turn.getyPoint().split("\\|")).mapToDouble(Double::parseDouble).toArray());
        return  turnDTO;
    }
}
