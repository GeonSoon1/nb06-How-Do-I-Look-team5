// script.js

// 모든 슬라이더 가져오기
// script.js

// ========== 슬라이더 기능 (이전 단계) ==========
const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
    slider.addEventListener('input', function() {
        const value = this.value;
        const valueDisplay = document.getElementById(this.id + '-value');
        valueDisplay.textContent = value;
    });
});

// ========== 입력 필드 검증 (이전 단계) ==========
const commentInput = document.getElementById('comment');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

function validateInputs() {
    const comment = commentInput.value.trim();
    const nickname = nicknameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (comment && nickname && password) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

commentInput.addEventListener('input', validateInputs);
nicknameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);
validateInputs();

// ========== 데이터 수집 함수 (이전 단계) ==========
function getCurationData() {
    return {
        trendy: parseInt(document.getElementById('trendy').value),
        personality: parseInt(document.getElementById('personality').value),
        practicality: parseInt(document.getElementById('practicality').value),
        valueForMoney: parseInt(document.getElementById('valueForMoney').value),
        comment: commentInput.value.trim(),
        nickname: nicknameInput.value.trim(),
        password: passwordInput.value.trim()
    };
}

// ========== ✨ 새로 추가: 서버로 데이터 전송 ==========

submitBtn.addEventListener('click', async function() {
    // 데이터 수집
    const data = getCurationData();
    
    // 최종 검증
    if (!data.comment || !data.nickname || !data.password) {
        alert('모든 필드를 입력해주세요!');
        return;
    }
    
    if (data.password.length < 4) {
        alert('비밀번호는 4자 이상이어야 합니다!');
        return;
    }
    
    // 로딩 상태 표시
    submitBtn.disabled = true;
    submitBtn.textContent = '제출 중...';
    
    try {
        // 서버로 POST 요청 보내기
        const response = await fetch('http://localhost:3000/api/curations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        // 응답 받기
        const result = await response.json();
        
        if (response.ok) {
            // 성공
            alert('큐레이팅이 성공적으로 제출되었습니다!');
            console.log('서버 응답:', result);
            
            // 폼 초기화
            resetForm();
        } else {
            // 실패
            alert(`제출 실패: ${result.error || '알 수 없는 오류'}`);
            console.error('에러:', result);
        }
        
    } catch (error) {
        // 네트워크 오류 등
        alert('서버 연결에 실패했습니다. 다시 시도해주세요.');
        console.error('네트워크 에러:', error);
    } finally {
        // 로딩 상태 해제
        submitBtn.disabled = false;
        submitBtn.textContent = '큐레이팅 참여하기';
        validateInputs(); // 버튼 상태 재검증
    }
});

// ========== 폼 초기화 함수 ==========
function resetForm() {
    commentInput.value = '';
    nicknameInput.value = '';
    passwordInput.value = '';
    
    document.getElementById('trendy').value = 5;
    document.getElementById('personality').value = 5;
    document.getElementById('practicality').value = 5;
    document.getElementById('valueForMoney').value = 5;
    
    document.getElementById('trendy-value').textContent = 5;
    document.getElementById('personality-value').textContent = 5;
    document.getElementById('practicality-value').textContent = 5;
    document.getElementById('valueForMoney-value').textContent = 5;
    
    validateInputs();
}

// ========== 닫기 버튼 ==========
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', function() {
    alert('모달 닫기');
});
