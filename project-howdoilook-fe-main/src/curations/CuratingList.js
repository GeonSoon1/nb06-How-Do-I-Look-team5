import React, { useState, useEffect  } from 'react';
import './CuratingList.css';

const CuratingList =  () => {
    const [curations, setCurations] = useState([]);
    const [selectedCategory, setSeletedCategory] = useState('');
    const [SearchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(''); // 현재 로그인한 사용자

    // 카테고리 목록
    const categories = ['', '',]; // 상품 항목들

    // 데이터 로드
    useEffect(() => {
        fetchCurations();
    }, [selectedCategory, SearchTerm]);

    const fetchCurations = async () => {
        try {
          const response = await fetch(
            `/api/curations?category=${selectedCategory}&search=${searchTerm}`
          );
          const data = await response.json();
          setCurations(data);
        } catch (error) {
            console.error('큐레이션 로드 실패:', error);
        }
    };

    // 검색 핸들러
    const handleSearch = (e) => {
      e.preventDefault();
      fetchCurations();
    };

    // 수정 핸들러
    const handleEdit = (curationId) => {
      // 수정 페이지로 이동 또는 모달 열기
      window.location.href = `/curating/edit/${curationId}`;
    };

    // 삭제 핸들러
    const handleDelete = async (curationId) => {
        if  (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
          const response = await fetch(`/api/curations/${curationId}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            alert('삭제되었습니다.');
            fetchCurations();
          } else {
            alert('삭제에 실패했습니다.');
          }
        } catch (error) {
          console.error('삭제 실패:', error);
          alert('오류가 발생했습니다.');
        }
      };

      // 답글 핸들러
      const handleReply = (curationId) => {
        // 답글 모달 열기
        // 이전에 만든 답글 모달을 여기서 사용
        console.log('답글하기:', curationId);
      };

      return (
       <div className="curating-container">
        {/* 헤더 */}
        <header className="curating-header">
          <h1>큐레이팅</h1>
          <button className="search-button">큐레이션 찾아보기</button>
      </header>
       
      {/* 검색 및 필터 */}
      <div className="search-filter-section">
        <div className="filter-row">
         <select
         className="Category-select"
         value={selctedCategory}
         onChange={(e) => setSelectedCategory(e.target.value)}
         >
           {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
           ))}
        </select>

        <form className="search=form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
        </form>
     </div>
  </div>

  {/* 큐레이션 리스트 */}
  <div className="curations-list">
    {curations.map((curation) => (
     <div key={curation.id} className="curation-item">
        {/* 상단 정보 */}
        <div className="curation-header">
          <span className="curator-label">어둠을: 큐레이터</span>
          <div className="action-buttons">
            {curation.author === currentUser ? (
              <>
                <button
                  className="btn-link"
                  onClick={() => handleEdit(curation.id)}
                >
                  수정하기
                </button>
                <button
                  className="btn-link"
                  onClick={() => handleDelete(curation.id)}
                >
                  삭제하기
                </button>
              </>
            ) : null}
            </div>
        </div>

        {/* 평가 점수 */}
        <div className="rating-section">
          <div className="rating-item">
            <span className="rating-label">투웨터</span>
            <span className="rating-value">{curation.scores.together}점</span>
        </div>
        <div className="rating-item">
          <span className="rating-label">개성</span>
          <span className="rating-value">{curation.scores.personality}점</span>
        </div>
        <div className="rating-item">
          <span className="rating-label">실용성</span>
          <span className="rating-value">{curation.scores.practicality}점</span>
        </div>
        <div className="rating-item">
          <span className="rating-label">가성비</span>
          <span className="rating-value">{curation.scores.value}점</span>
          </div>
        </div>

        {/* 한줄 큐레이팅 */}
        <div className="one-line-review">
          <h3>한줄 큐레이팅</h3>
          <p>{curation.review}</p>
        </div>
        
        {/* 가격 정보 */}
        <div className="price-info">
            <span className="price-label">가격보다:</span>
            <span className="price-value">{curation.priceRating}점</span>
        </div>

        {/* 태그/추가 정보 */}
        {curation.tags && (
         <div className="tags-info">
            <p>{curation.tags}</p>
          </div>  
        )}
        
        {/* 하단 액션 버튼 */}
        <div className="curation-footer">
          {curation.author !== currentUser && (
            <button
             className="btn-reply"
             onClick={() => handleReply(curation.id)}
          >
            답글하기
          </button> 
          )}
          {curation.author === currentUser && (
            <div className="owner-actions">
             <button
             className="btn-link-small"
             onClick={() => handleEdit(curation.id)}
          >
            수정하기
          </button>
          <button
          className="btn-link-small"
          onClick={() => handleDelete(curation.id)}
          >
            삭제하기
          </button>
        </div>
     )}
     </div>
     </div>
    ))}
    </div>
    </div>
      );
    };

    export default CuratingList;

        
        
        