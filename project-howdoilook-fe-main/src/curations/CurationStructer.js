/**
 * 큐레이팅 객체 구조 정의
 */
const CurationStructer = {
  id: 1,                      // 큐레이팅 고유 ID (number)
  styleId: 1,                 // 스타일 ID (number)
  nickname: "닉네임",          // 작성자 닉네임 (string)
  trendy: 7,                 // 트렌디 점수 (number)
  unique: 9,                 // 개성 점수 (number)
  practical: 5,              // 실용성 점수 (number)
  price: 6,                  // 가성비 점수 (number)
  comment: "한줄 큐레이팅",     // 큐레이팅 내용 (string)
  password: "hashedPassword", // 비밀번호 (string)
  reply: {
    id: 10,
    nickname: "관리자",
    content: "답글 예시",
    createdAt: "2025-11-15T08:56:30Z"
  }, // 답글 있는 경우 날짜,시간 기입 그렇지 않으면 null/undefined
  createdAt: "2025-11-16T15:32:45Z" // 작성 시각 (string/Date)
};

module.exports = CurationStructer;
