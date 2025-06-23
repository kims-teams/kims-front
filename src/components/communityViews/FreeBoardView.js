"use client";

import { Box, Typography, Link, Stack, Divider, Grid } from "@mui/material";

const boardData = [
  {
    title: "자유게시판",
    posts: [
      {
        title: "『신한 스퀘어브릿지 청년 해커톤』 참가자 모집",
        date: "2025-06-20",
      },
      {
        title: "부수입을 만들고 싶은 분들, AI로 나만의 자동화",
        date: "2025-06-19",
      },
      {
        title: "[인턴십 포함] 인턴십 매칭율 97% 실무 경험 프로그램",
        date: "2025-06-19",
      },
      {
        title: "[신청 마감 D-1] 현직자가 알려주는 UX/UI 실무 전략",
        date: "2025-06-18",
      },
      {
        title: "[이번 주 마감] PM 준비중이시라면? 실무 프로젝트",
        date: "2025-06-13",
      },
      {
        title: "[전액무료] 현직자와 함께하는 디자이너 직무캠프",
        date: "2025-06-03",
      },
    ],
  },
  {
    title: "회사생활",
    posts: [
      {
        title: "💼IT 직군 취업과 커리어 성장을 위한 사이트 추천",
        date: "2025-06-07",
      },
      { title: "회사에 1인 디자이너 피드백 받을때", date: "2025-05-29" },
      {
        title: "퇴사하고 싶을 때 / 커리어가 막막할 때 / 직장인의 현실",
        date: "2025-04-30",
      },
      {
        title: "정보 | IT 직군 취업과 커리어 성장을 위한 사이트 추천",
        date: "2025-03-27",
      },
      {
        title: "커리어 쌓을 곳 없어서 고민인 ???? 디자이너 분들",
        date: "2025-02-22",
      },
      {
        title: "안녕하세요 고민많은 신입디자이너 입니다..",
        date: "2025-02-15",
      },
    ],
  },
  {
    title: "프리랜서",
    posts: [
      {
        title: "💼IT 직군 취업과 커리어 성장을 위한 사이트 추천",
        date: "2025-06-07",
      },
      {
        title: "개인사업자 비교견적제 교환하실분 계신가요 +2",
        date: "2025-06-01",
      },
      {
        title: "100억 밸류를 목표로 하는 창립 멤버를 찾습니다",
        date: "2025-05-28",
      },
      {
        title: "(상품모음) 설문조사 한번씩만 부탁드립니다 🙏",
        date: "2025-05-10",
      },
      { title: "정기적으로 외주 디자인 공고 올려주는 방", date: "2025-03-29" },
      {
        title: "커리어 쌓을 곳 없어서 고민인 ???? 디자이너 분들",
        date: "2025-02-22",
      },
    ],
  },
  {
    title: "회사생활 인스타툰",
    posts: [
      {
        title: "직장인이라면 무조건 공감하는 부분 - 회사생활 인스타툰 +1",
        date: "2024-01-19",
      },
      {
        title: "2024 디자인 트렌드? 팬톤 컬러반응 - 직장인 반응",
        date: "2024-01-17",
      },
      {
        title: "MBTI 별 수장식한 디자이너 반응 - 직장생활툰",
        date: "2024-01-17",
      },
      { title: "겨울에 싫은 이유는? - 디자이너 인스타툰", date: "2024-01-15" },
      {
        title: "전달력 넘버 원 - 디자이너생활 공감 인스타툰",
        date: "2024-01-13",
      },
      { title: "연봉협상 실패한 인스타툰", date: "2024-01-11" },
    ],
  },
  {
    title: "취업/이직",
    posts: [
      { title: "2025 상반기 공채 일정 정리 모음", date: "2025-06-12" },
      { title: "이직 준비할 때 자주 묻는 질문 7가지", date: "2025-05-28" },
      { title: "포트폴리오 첨삭해드립니다 ✨", date: "2025-05-24" },
      { title: "면접 경험 공유해요! (개발직군)", date: "2025-05-14" },
      { title: "잡플래닛 믿을만한가요?", date: "2025-04-30" },
      { title: "비전공자의 취준 스토리", date: "2025-03-18" },
    ],
  },
  {
    title: "디자인 커뮤니티",
    posts: [
      { title: "Figma 잘 쓰는 법 10가지", date: "2025-06-10" },
      { title: "디자이너들이 사랑하는 폰트 TOP 5", date: "2025-06-05" },
      { title: "UI/UX 인터랙션 참고 사이트 모음", date: "2025-05-29" },
      { title: "디자인 코딩 협업툴 추천좀요", date: "2025-05-20" },
      { title: "마이크로인터랙션이란?", date: "2025-05-10" },
      { title: "컬러 팔레트 어디서 참고하세요?", date: "2025-05-01" },
    ],
  },
];

export default function BoardListGrid() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        커뮤니티
      </Typography>

      <Grid container spacing={6}>
        {boardData.map((section, index) => (
          <Grid item xs={12} md={6} key={section.title}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  {section.title}
                </Typography>
                <Link href="#" fontSize={14} underline="hover">
                  더보기
                </Link>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Stack spacing={1}>
                {section.posts.map((post, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      component={Link}
                      href="#"
                      fontSize={14}
                      noWrap
                      sx={{
                        maxWidth: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#222",
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
