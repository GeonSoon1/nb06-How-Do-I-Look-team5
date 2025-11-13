// 수정 엔드포인트
Router.put('/reply/:id', async (req, res) => {
  const { content, password } = req.body;
  const { id } = req.params;

  // 비밀번호 확인
  const reply = await prisma.reply.findUnique({ where: { id: Number(id) } });
  if (reply.password !== password) {
    return res.status(403).json({ message: '비밀번호가 맞지 않습니다.' });
  }
  // 답글 내용 수정
  const updated = await prisma.reply.update({
    where: { id: Number(id) },
    data: {content }
  });
  res.json(updated);
});