// server.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(cors()); // CORS 허용 (프론트엔드와 통신)
app.use(express.json()); // JSON 파싱

// 임시 데이터 저장소 (실제로는 DB 사용)
let curations = [];
let nextId = 1;

// ========== API 엔드포인트 ==========

// 큐레이팅 생성 (POST)
app.post('/api/curations', async (req, res) => {
    try {
        const { trendy, personality, practicality, valueForMoney, comment, nickname, password } = req.body;
        
        // 1. 데이터 검증
        if (!comment || !nickname || !password) {
            return res.status(400).json({
                success: false,
                error: '모든 필드를 입력해주세요'
            });
        }
        
        if (password.length < 4) {
            return res.status(400).json({
                success: false,
                error: '비밀번호는 4자 이상이어야 합니다'
            });
        }
        
        // 2. 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 3. 데이터 저장 (실제로는 DB에 저장)
        const newCuration = {
            id: nextId++,
            trendy: parseInt(trendy),
            personality: parseInt(personality),
            practicality: parseInt(practicality),
            valueForMoney: parseInt(valueForMoney),
            comment,
            nickname,
            password: hashedPassword, // 암호화된 비밀번호 저장
            createdAt: new Date().toISOString()
        };
        
        curations.push(newCuration);
        
        // 4. 응답 (비밀번호는 제외하고 반환)
        const { password: _, ...curationWithoutPassword } = newCuration;
        
        res.status(201).json({
            success: true,
            message: '큐레이팅이 등록되었습니다',
            data: curationWithoutPassword
        });
        
        console.log('새 큐레이팅 등록:', curationWithoutPassword);
        
    } catch (error) {
        console.error('에러:', error);
        res.status(500).json({
            success: false,
            error: '서버 오류가 발생했습니다'
        });
    }
});

// 모든 큐레이팅 조회 (GET)
app.get('/api/curations', (req, res) => {
    // 비밀번호 제외하고 반환
    const curationsWithoutPassword = curations.map(({ password, ...rest }) => rest);
    
    res.json({
        success: true,
        data: curationsWithoutPassword,
        count: curationsWithoutPassword.length
    });
});

// 특정 큐레이팅 조회 (GET)
app.get('/api/curations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const curation = curations.find(c => c.id === id);
    
    if (!curation) {
        return res.status(404).json({
            success: false,
            error: '큐레이팅을 찾을 수 없습니다'
        });
    }
    
    const { password, ...curationWithoutPassword } = curation;
    res.json({
        success: true,
        data: curationWithoutPassword
    });
});

// 큐레이팅 삭제 (DELETE)
app.delete('/api/=/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { password } = req.body;
        
        const curationIndex = curations.findIndex(c => c.id === id);
        
        if (curationIndex === -1) {
            return res.status(404).json({
                success: false,
                error: '큐레이팅을 찾을 수 없습니다'
            });
        }
        
        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, curations[curationIndex].password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: '비밀번호가 일치하지 않습니다'
            });
        }
        
        // 삭제
        curations.splice(curationIndex, 1);
        
        res.json({
            success: true,
            message: '큐레이팅이 삭제되었습니다'
        });
        
    } catch (error) {
        console.error('에러:', error);
        res.status(500).json({
            success: false,
            error: '서버 오류가 발생했습니다'
        });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
