const Comment = require('../models/commentController');
const bcrypt = require('bcrypt');

const createComment = async (req, res) => {
  try {
    const { styleId, curationId, content, nickname, password} = req.body;

    // 필수 필드 검증
    if (!styleId || !content || !nickname || !password) {
      return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
    }

    // 비밀번호 해시 처리
    const hashedPassword = await bcrypt.hash(password, 10);

    // 댓글 생성
    const newComment = new Comment({
      styleId,
      curationId: curationId || null,
      content,
      nickname,
      password: hashedPassword
    });

    await newComment.save();

    res.status(201).json({ message: '댓글이 등록되었습니다', commentId: newComment._id});
 } catch (error) {
   console.error('댓글 등록 오류:', error);
   res.status(500) .json({ message: '서버 오류로 댓글을 등록할 수 없습니다.' });
 }
};

module.exports = { createComment };