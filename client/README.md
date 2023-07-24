# 클라이언트

#### react-router-dom v6.4 이후 버전 사용

https://reactrouter.com/en/main/start/overview

### 할일

- [x] 라우터 구성
- [ ] 전체적인 뼈대 UI
- [ ] Video Player UI
- [ ] 상태관리 처리
- [ ] 비디오 기능 hooks
- [ ] 로그인 구현
- [ ] 댓글 작성 UI
- [ ] 풀스크린시 video 태그의 requestFullscreen 메소드 대신 다른 방법으로 대체
  - video태그의 requestFullscreen()을 사용하면 커스텀 비디오 컨트롤러 UI를 사용하지 못함
- [ ] ...

// CloudComment 구상

- 미리 모든 구름들을 그린 컴포넌트를 생성하여 동영상 시점에 맞게 translateX로 이동
- 2초 간격으로 댓글 시작 시점이 오른쪽에서 생성되어 왼쪽 끝에 닿아야함

- 1. 동영상 width,height를 기준으로 CloudCommentOverlay의 크기를 결정(아마 width: videoWidth \* (videoDuration / 2))
- 2. CloudCommentOverlay는 현재 재생시점으로 translateX를 구하여 댓글이 흐르도록 구현
- 3. 각 CloudComment들은 left로 100% \* (구름 출현시간/동영상 총 플레이타임) + 동영상 width 을 가짐
