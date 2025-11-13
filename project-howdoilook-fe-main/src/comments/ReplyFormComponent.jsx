function ReplyFrom({ onSubmit }) {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ content, password });
      }}
    >
    <textarea
      placeholder="답글을 입력해 주세요"
      value={content}
      onChange={e => setContent(e.target.value)}
      />
      <input
      type="password"
      placeholder="스타일 등록시 작성했던 비밀번호를 입력해 주세요"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
    <button type="submit">등록하기</button>
  </form>
 );
}