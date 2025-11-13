// 등록 버튼 클릭 시 실행
axios.post('/api/reply', { content, password })
  .then(res => alert('등록 완료'))
  .catch(err => alert('실패: ' + err.response.data.message));