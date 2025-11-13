// 부모 컴포넌트 -> onSubmit (axios 요청 함수 전달)
const handleReplyUpdate = async ({ content, password }) => {
  return axios.put(`/api/reply/${replyId}`, { content, password });
};