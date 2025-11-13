const express = require('express');
const router = express.Router();
const CurationController = require('../controllers/CurationController');

router.get('/curation', CurationController.list);
router.get('/styles', CurationController.styleListWithCount);

Router.post('/reply', async (req, res, next) => {
  try {
    const { curationId, nickname, content, password } = req.body;
    // 큐레이팅에 이미 답글 있는지 확인
    const exist = await prisma.reply.findUnique({ where: { curationId } });
    if (exist) return res.status(400).json({ message: '이미 답글이 있습니다.' });

    // 비밀번호 확인
    const curation = await prisma.curation.findUnique({ where: { id: curationId} });
    if (!curation || curation.password !== password)
        return res.status(403).json({ message: '비밀번호가 맞지 않습니다.' });

    // 답글 등록
    const reply = await prisma.reply.create({
      data: { curationId, nickname, content },
    });
    res.json(reply);
} catch (err) {
  next(err);
 }
});

// 답글 수정 및 삭제(비밀번호 체크)
Router.put('/reply/:id', async (req, res, next) => {
  try{
    const { content, password } = req.body;
    const reply = await prisma.reply.findUnique({ where: { id: Number(req.params.id) } });
    const curation = await prisma.curation.findUnique({ where: { id: reply.curationId} });
    if (!curation || curation.password !== password)
      return res.status(403).json({ message: '비밀번호가 맞지 않습니다.' });

   const updated = await prisma.reply.update({
     where: { id: Number(req.params.id) },
     data: { content }
  });
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/reply/:id', async (req, res, next) => {
  try {
    const { password } = req.body;
    const reply = await prisma.reply.findUnique({ where: { id: Number(req.params.id) }});
    const curation  = await prisma.curation.findUnique({ where: { id: reply.curationId} });
    if (!curation || curation.password !== password)
      return res.status(403).json({ message: '비밀번호가 맞지 않습니다.' });

    await prisma.reply.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;