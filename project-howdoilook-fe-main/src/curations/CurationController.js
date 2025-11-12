const { orderBy } = require("lodash");

class CurationController { 
  static async list(req, res, next) { 
    try{
      const { styleId, filter, search } = req.query;
      const where = {
        ...(styleId ? { styleId: Number(styleId) } : {}),
        ...(search
          ? filter === "닉네임"
            ? { nickname: { contains: search } }
            : { comment: { contains: search } }
          : {}),
    };
    const curations = await prisma.curation.findMany({
      where,
      include: {
        reply: true,
      },
      orderBy: { id: "desc" },
    });
    res.json(curations);
  } catch (err) {
    next(err);
  }
}

// 스타일 목록 조회 + 큐레이팅 개수
static async styleListWithCount(req, res, next) {
  try {
    const styles = await prisma.style.findMany({
      include: {
        _count: {
          select: { curations: true },
       },
    },
 });
    res.json(styles);
  } catch (err) {
    next(err);
  }
}

// 나머지도 동일하게 static 메서드로 추가
}
module.exports = CurationController;




