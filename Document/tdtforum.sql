-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2017 at 05:48 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tdtforum`
--

-- --------------------------------------------------------

--
-- Table structure for table `questionreferences`
--

CREATE TABLE `questionreferences` (
  `id` int(11) NOT NULL,
  `TestQuestionId` int(11) NOT NULL,
  `MongoId` varchar(128) NOT NULL,
  `Content` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questionreferences`
--

INSERT INTO `questionreferences` (`id`, `TestQuestionId`, `MongoId`, `Content`) VALUES
(1, 1, '582f33e03934e818f044d373', NULL),
(2, 1, '58974c0a51dee7001107faf3', NULL),
(3, 1, '582f3f8c3934e818f044d422', NULL),
(4, 4, '582f33e03934e818f044d373', NULL),
(5, 4, '5897371551dee7001107fa88', NULL),
(6, 5, '582f34223934e818f044d375', NULL),
(7, 5, '5897364851dee7001107fa7e', NULL),
(8, 6, '582f359d3934e818f044d385', NULL),
(9, 6, '582f35883934e818f044d383', NULL),
(10, 7, '582f37493934e818f044d39e', NULL),
(11, 7, '582f378e3934e818f044d3a2', NULL),
(12, 8, '582f385b3934e818f044d3b0', NULL),
(13, 8, '582f3af73934e818f044d3d0', NULL),
(14, 9, '582f38d53934e818f044d3b8', NULL),
(15, 9, '582f38b03934e818f044d3b6', NULL),
(16, 10, '582f37493934e818f044d39e', NULL),
(17, 10, '582f39d03934e818f044d3c6', NULL),
(18, 11, '5897307a94579500113e859e', NULL),
(19, 12, '589734e351dee7001107fa78', NULL),
(20, 12, '582f3b713934e818f044d3da', NULL),
(21, 13, '582f3b573934e818f044d3d8', NULL),
(22, 13, '582f3bdd3934e818f044d3e2', NULL),
(23, 13, '582f3c363934e818f044d3e6', NULL),
(24, 14, '58974e7551dee7001107fb09', NULL),
(25, 14, '582f3cc43934e818f044d3f2', NULL),
(26, 15, '582f3d4d3934e818f044d3fa', NULL),
(27, 15, '582f3ede3934e818f044d414', NULL),
(28, 15, '582f3c6d3934e818f044d3ea', NULL),
(29, 16, '582f3dfc3934e818f044d404', NULL),
(30, 17, '5892a2dcba301100117c89f1', NULL),
(31, 18, '582f3ead3934e818f044d410', NULL),
(32, 18, '5897387851dee7001107fa92', NULL),
(33, 19, '582f3f7e3934e818f044d420', NULL),
(34, 19, '582f3f8c3934e818f044d422', NULL),
(35, 20, '582f329a3934e823343a3935', NULL),
(36, 20, '58974a6251dee7001107fae9', NULL),
(37, 21, '582f36593934e818f044d391', NULL),
(38, 21, '58973c2c51dee7001107faac', NULL),
(39, 21, '582f35bf3934e818f044d387', NULL),
(40, 22, '582f35ef3934e818f044d38b', NULL),
(41, 22, '582f366e3934e818f044d393', NULL),
(42, 22, '5897391c51dee7001107fa94', NULL),
(43, 23, '58974a6251dee7001107fae9', NULL),
(44, 23, '582f382a3934e818f044d3ac', NULL),
(45, 24, '582f3da43934e818f044d3fe', NULL),
(46, 24, '582f3ca63934e818f044d3f0', NULL),
(47, 25, '582f37283934e818f044d39c', NULL),
(48, 26, '582f3ae33934e818f044d3ce', NULL),
(49, 26, '582f382a3934e818f044d3ac', NULL),
(50, 26, '58972f6194579500113e8592', NULL),
(51, 27, '589730c351dee7001107fa6e', NULL),
(52, 28, '589730ab51dee7001107fa6c', NULL),
(53, 29, '5897307a94579500113e859e', NULL),
(54, 30, '5897305f94579500113e859c', NULL),
(55, 31, '5897303a94579500113e859a', NULL),
(56, 32, '58972ff694579500113e8598', NULL),
(57, 33, '58972f7894579500113e8594', NULL),
(58, 34, '58972ef294579500113e858e', NULL),
(59, 35, '58972eb094579500113e858c', NULL),
(60, 36, '5892a66da936f832ec1938d2', NULL),
(61, 37, '5892a2dcba301100117c89f1', NULL),
(62, 38, '5892a2a4ba301100117c89ef', NULL),
(63, 39, '582f3fa23934e818f044d424', NULL),
(65, 40, '582f3e653934e818f044d40a', NULL),
(66, 41, '582f3b403934e818f044d3d6', NULL),
(67, 42, '582f37493934e818f044d39e', NULL),
(68, 43, '58973b1151dee7001107faa8', NULL),
(69, 44, '58973bfe51dee7001107faaa', NULL),
(70, 45, '58973c2c51dee7001107faac', NULL),
(71, 46, '58973c5951dee7001107faae', NULL),
(72, 47, '58973c9251dee7001107fab0', NULL),
(73, 48, '58973d2351dee7001107fab6', NULL),
(74, 49, '58973f0351dee7001107fabc', NULL),
(75, 50, '58973f7251dee7001107fabf', NULL),
(76, 51, '5897463851dee7001107fac1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `testquestion`
--

CREATE TABLE `testquestion` (
  `id` int(11) NOT NULL,
  `Content` varchar(512) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testquestion`
--

INSERT INTO `testquestion` (`id`, `Content`) VALUES
(1, 'Xin giấy xác nhận sinh viên ở đâu?'),
(3, 'Thủ tục gia hạn học phí như thế nào?'),
(4, 'Có thể xin gia hạn học phí được hay không?'),
(5, 'Điều kiện Miễn TOEIC?'),
(6, 'Điều kiện tốt nghiệp?'),
(7, 'Khi nào nộp chứng chỉ toeic?'),
(8, 'Làm đơn phúc khảo như thế nào?'),
(9, 'Thủ tục xin chuyển giờ thi như thế nào?'),
(10, 'Thủ tục xin miễn học anh văn như thế nào?'),
(11, 'Lợi ích học ngành 2?'),
(12, 'Em rớt anh văn có cần phải học lại không?'),
(13, 'Thủ tục đăng kí môn học như thế nào?'),
(14, 'Em có thể xin hoàn lại học phí được không?'),
(15, 'Em có nhờ tư vấn đăng kí kế hoạch học tập ở đâu?'),
(16, 'Thủ tục nộp đơn trực tuyến ra sao?'),
(17, 'Em muốn xin nghỉ học thì làm như thế nào?'),
(18, 'Đăng ký môn học thay thế ra sao?'),
(19, 'Học kỳ dự thính là gì?'),
(20, 'Thủ tục xin bảng điểm như thế nào?'),
(21, 'Lệ phí luận văn là bao nhiêu?'),
(22, 'Xin thực tập ra sao?'),
(23, 'Cách tính điểm trung bình tích lũy?'),
(24, 'Thủ tục rút môn học như thế nào?'),
(25, 'THời gian điểm danh toeic không chính xác em phải làm sao?'),
(26, 'Tín chỉ là gì? Cách tính ra sao?'),
(27, 'Tốt nghiệp sớm có được không?'),
(28, 'Học ngành công nghệ sinh học và học thêm ngành Quản trị kinh doanh thì phải bổ sung bao nhiêu môn học nữa?'),
(29, 'Có lợi gì khi học chuyên ngành 2?'),
(30, 'Môn tự chọn chuyên ngành Ngân hàng là gì?'),
(31, 'Nếu là đối tượng ưu tiên thời gian đào tạo có khác không?'),
(32, 'Kế hoạch đạo tạo có thể xem ở đâu?'),
(33, 'Bao nhiêu tín chỉ mới đươc ra trường?'),
(34, 'Điều kiện để chuyển trường như thế nào?'),
(35, 'Em sẽ bị buộc thôi học trong trường hợp nào?'),
(36, 'Thời gian bảo lưu kết quả học tập là bao lâu?'),
(37, 'Em được phép nghỉ học tạm thời trong trường hợp nào?'),
(38, 'Xem đề cương môn học ở đâu?'),
(39, 'Muốn học cải thiện cần thủ tục gì?'),
(40, 'Điều kiện học thêm 1 ngành khác là gì?'),
(41, 'Xem thời khóa biểu bằng cách nào?'),
(42, 'Muốn được miễn học toeic phải làm sao?'),
(43, 'Số lần thi tốt nghiệp là bao nhiêu'),
(44, 'Tốt nghiệp trễ có ảnh hưởng tới xét loại tốt nghiêp không?'),
(45, 'Lệ phí thực tập tốt nghiệp như thế nào?'),
(46, 'Điều kiện để xét tốt nghiệp?'),
(47, 'Khi nào nộp điểm toeic để xét tốt nghiệp?'),
(48, 'Học liên thông có được cấp bằng đại học chính quy không?'),
(49, 'Điều kiện thi tốt nghiệp như thế nào?'),
(50, 'Điều kiện được bảo vệ khóa luận tốt nghiệp?'),
(51, 'Có được thực tập tại các tỉnh khác TPHCM không?');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questionreferences`
--
ALTER TABLE `questionreferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TestQuestionId` (`TestQuestionId`);

--
-- Indexes for table `testquestion`
--
ALTER TABLE `testquestion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questionreferences`
--
ALTER TABLE `questionreferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `testquestion`
--
ALTER TABLE `testquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `questionreferences`
--
ALTER TABLE `questionreferences`
  ADD CONSTRAINT `QuestionReferences_ibfk_1` FOREIGN KEY (`TestQuestionId`) REFERENCES `testquestion` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
