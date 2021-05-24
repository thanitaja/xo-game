package com.example.XoGame.Controllers;
import com.example.XoGame.DTOS.HistoryDTO;
import com.example.XoGame.Entities.PlayerHistory;
import com.example.XoGame.Services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class XoGameController {
    @Autowired
    private HistoryService historyService;

    @GetMapping("/")
    public String index(ModelMap model){
        return "index";
    }

    @GetMapping("/history")
    public String historyBoard(ModelMap model){
        List<PlayerHistory> playerHistories = historyService.getAll();
        model.addAttribute("playerHistories", playerHistories);
        return "history";
    }

    @GetMapping("/show-history/{id}")
    public String viewHistory(@PathVariable Integer id, ModelMap model){
        HistoryDTO historyDTO = historyService.getHistory(id);
        model.addAttribute("historyDTO", historyDTO);
        model.addAttribute("win", historyDTO.getWinner());
        return "show";
    }

    @GetMapping("/xoboard")
    public String xoBoard(ModelMap model){
        return "xoboard";
    }

    @PostMapping("/save-history")
    public String saveHistory(@RequestBody HistoryDTO historyDTO) {
        historyService.saveHistory(historyDTO);
        return "xoboard";
    }
}
