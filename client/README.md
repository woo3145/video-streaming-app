# 클라이언트

#### react-router-dom v6.4 이후 버전 사용

https://reactrouter.com/en/main/start/overview

### 할일

- [x] 라우터 구성
- [x] 전체적인 뼈대 UI
- [x] Video Player UI
- [x] 상태관리 처리
- [ ] 비디오 기능 hooks
- [ ] 로그인 구현
- [ ] 댓글 작성 UI
- [ ] 풀스크린시 video 태그의 requestFullscreen 메소드 대신 다른 방법으로 대체
  - video태그의 requestFullscreen()을 사용하면 커스텀 비디오 컨트롤러 UI를 사용하지 못함
- [x] 구름 댓글 구현
- [ ] 구름 댓글 개별 속도 기능
- [ ] ...

#### ☁️ 구름 댓글 구상

- 미리 모든 구름들을 그린 컴포넌트를 생성하여 동영상 시점에 맞게 translateX로 이동
- n초 간격으로 댓글 시작 시점이 오른쪽에서 생성되어 왼쪽 끝에 닿아야함

1. 동영상 width,height를 기준으로 CloudCommentOverlay의 크기를 결정(아마 width: videoWidth \* (videoDuration / n))
2. CloudCommentOverlay는 현재 재생시점으로 translateX를 구하여 댓글이 흐르도록 구현
3. 각 CloudComment들은 left로 100% \* (구름 출현시간/동영상 총 플레이타임) + 동영상 width 을 가짐

currentTime을 requestAniamtionFrame으로 업데이트 간격을 늘려 부드러운 애니메이션이 되도록 보완

##### 고민해볼꺼

- 구름 댓글이 흐르는 속도를 사용자가 지정할 수 있는 방법 모색
  - 문제: 구름이 각각 애니메이션을 가진다면 렌더링 성능 문제가 생길 것 같아 하나의 오버레이로 통합하여 흐르는 중
  - 해결법 구상:
    1. 댓글이 흐르는 속도는 4가지 정도로만 제한
    2. 기존 오버레이 컴포넌트에 speed 옵션을 추가해서 흐르는 속도를 조절
    3. 부모에서 댓글을 속도별로 분류하여 속도별 오버레이를 생성
