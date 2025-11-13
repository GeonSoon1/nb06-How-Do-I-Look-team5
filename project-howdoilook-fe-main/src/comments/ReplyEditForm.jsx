function ReplyEditForm({ originalContent, onSubmit, onCancel }) {
  const [content, setContent] = useState(originalContent || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 유효성 검사 함수
  const validate = () => {
    if (!content.trim()) return '답글을 입력해 주세요.';
    if (!password.trim()) return '비밀번호를 입력해 주세요.';
    return '';
  };

  // 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = Validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    try{
      await onSubmit({ content, password });
      // 성공 후 폼 초기화나 알림 등 처리
    } catch (err) {
      setError(err.response?.data?.message || '수정 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="답글을 입력해주세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="스타일 등록시 작성했던 비밀번호를 입력해 주세요"
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="button" onClick={onCancel} disabled={loading}>취소하기</button>
      <button type="submit" disabled={loading}>
        {loading ? '수정 중 ...' : '수정하기'}
     </button>      
   </form>
  );
}
