-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2021 at 12:50 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xo_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `game_turn`
--

CREATE TABLE `game_turn` (
  `id` int(11) NOT NULL,
  `x_point` varchar(500) NOT NULL,
  `y_point` varchar(500) NOT NULL,
  `type` char(1) NOT NULL,
  `history_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `game_turn`
--

INSERT INTO `game_turn` (`id`, `x_point`, `y_point`, `type`, `history_id`) VALUES
(10, '100.0|500.0|100.0|500.0|300.0|', '100.0|500.0|500.0|300.0|100.0|', 'X', 6),
(11, '100.0|300.0|300.0|500.0|', '300.0|500.0|300.0|100.0|', 'O', 6),
(12, '100.0|100.0|300.0|500.0|', '300.0|500.0|100.0|300.0|', 'X', 7),
(13, '500.0|300.0|300.0|500.0|100.0|', '100.0|300.0|500.0|500.0|100.0|', 'O', 7),
(14, '500.0|100.0|500.0|300.0|100.0|', '100.0|100.0|300.0|500.0|300.0|', 'X', 8),
(15, '100.0|300.0|500.0|300.0|', '500.0|100.0|500.0|300.0|', 'O', 8),
(16, '', '', 'X', 9),
(17, '500.0|', '100.0|', 'O', 9),
(18, '', '', 'X', 10),
(19, '', '', 'O', 10),
(20, '', '', 'X', 11),
(21, '', '', 'O', 11),
(22, '', '', 'X', 12),
(23, '100.0|', '300.0|', 'O', 12),
(24, '', '', 'X', 13),
(25, '500.0|', '500.0|', 'O', 13),
(26, '100.0|300.0|500.0|100.0|', '300.0|100.0|300.0|500.0|', 'X', 14),
(27, '300.0|300.0|500.0|100.0|500.0|', '500.0|300.0|100.0|100.0|500.0|', 'O', 14);

-- --------------------------------------------------------

--
-- Table structure for table `player_histories`
--

CREATE TABLE `player_histories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `size` int(11) NOT NULL,
  `character_player` char(1) NOT NULL,
  `first_turn` char(1) NOT NULL,
  `winner` char(1) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_histories`
--

INSERT INTO `player_histories` (`id`, `name`, `size`, `character_player`, `first_turn`, `winner`, `created_date`) VALUES
(6, 'ky', 3, 'X', 'X', 'D', '2021-05-24 00:47:11'),
(7, 'agumon', 3, 'X', 'O', 'O', '2021-05-24 02:18:52'),
(8, 'veemon', 3, 'O', 'X', 'D', '2021-05-24 02:46:58'),
(9, 'test give up', 3, 'X', 'O', 'X', '2021-05-24 03:16:22'),
(10, 'give up 2', 3, 'X', 'X', 'X', '2021-05-24 03:16:54'),
(11, 'give up ver 1', 3, 'X', 'X', 'O', '2021-05-24 03:20:29'),
(12, 'give up ver 2', 3, 'X', 'O', 'O', '2021-05-24 03:21:02'),
(13, 'tast save', 3, 'X', 'O', 'O', '2021-05-24 03:23:08'),
(14, 'git', 3, 'X', 'O', 'O', '2021-05-24 03:48:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_turn`
--
ALTER TABLE `game_turn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player_histories`
--
ALTER TABLE `player_histories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game_turn`
--
ALTER TABLE `game_turn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `player_histories`
--
ALTER TABLE `player_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
