// routes/comment.js
router .post('/reply' , async (req, res) => {
  const { content, password } = req.body;
  // 필수 값 검사
  if (!content || !password) {
    return res.status(400).json({ message: '내용과 비밀번호를 입력하세요.' });
  }
  // DB에 저장 로직
  const reply = await prisma.reply.create({
    data: { content, password }
  });
  res.json(reply);
});