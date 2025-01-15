
<div align="center">
<img src="https://github.com/user-attachments/assets/29f08d1e-f812-44a7-a6f1-f9ee0438ca05" width="300">
</div>

<br>
<br>

# 🎞 SEARCHLIX : movie-finder 
> 배포 주소 : [https://movie-info-ebon.vercel.app](https://movie-info-ebon.vercel.app/)

<br>

![image](https://github.com/user-attachments/assets/8db0efcb-f7b9-43b3-a942-ef22177b7d6b)
![image](https://github.com/user-attachments/assets/b5175e0d-a64d-4486-b59b-e66a86f9f5ab)

<br>
<br>

## 💬 프로젝트 소개

> 📅 개발 기간 : 2025. 01. 07 ~ 2025. 01. 15 (총 8일)
> <br><br>
> 다양한 영화를 검색하고, 원하는 영화를 북마크하여 저장할 수 있는 웹 애플리케이션입니다.
> <br> TMDB Open API를 활용해 인기 영화를 실시간으로 불러오고, 검색 기능과 북마크 기능을 통해 더 나은 사용자 경험을 제공합니다.
> <br> 간단한 반응형 디자인을 적용하여 PC 환경에서 최적화되어 있으며, 모바일 환경은 지원하지 않습니다.


<br>
<br>

## ⚙ 프로젝트 기능 소개

- 라이브러리 사용 없이 🍦 **바닐라 자바스크립트**로 구성된 프로젝트입니다.
- **TMDB Open API**의 `인기 영화 목록 API`와 `영화 검색어 조회 API`를 활용했습니다.
- **로컬 스토리지**를 이용해 북마크 기능을 구현, 유저가 북마크한 영화를 저장하고 쉽게 확인할 수 있습니다.
- **디바운싱 기법**을 활용하여 실시간으로 검색어에 해당하는 영화를 효율적으로 검색할 수 있습니다.
- 기본 브라우저 알럿 대신 **토스트 팝업**을 사용하여 사용자 경험을 개선했습니다.

<br>
<br>

## 🚀 트러블 슈팅

- ### [[상세 모달] 모달 클릭 이벤트 에러 : 안전한 이벤트 위임 처리](https://velog.io/@jiyunk/트러블슈팅-모달-클릭-이벤트-에러-안전한-이벤트-위임-처리)
- ### [[북마크] 컴퓨터는 생각보다 멍청하다 - 세션 스토리지 내 같은 값 누적 이슈](https://velog.io/@jiyunk/%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-%EC%84%B8%EC%85%98-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80%EC%95%BC-%EC%99%9C-%EA%B0%99%EC%9D%80-%EA%B0%92%EC%9D%84-%EC%9E%90%EA%BE%B8-%EC%A0%80%EC%9E%A5%ED%95%98%EB%8B%88)
- ### [[검색] 디바운싱과 검색어 처리: 트러블슈팅으로 배우는 실전 팁](https://velog.io/@jiyunk/트러블슈팅-디바운싱과-검색어-처리-트러블슈팅으로-배우는-실전-팁)

<br>
<br>

## 📁 프로젝트 구조

```markdown
📁
|- css/
|   |- font.css
|   |- normalize.css
|   |- style.css  
|
|- js/
|   |- api/ moviesApi.js
|   |- component/ renderMovies.js
|   |- util/
|   |   |- debounceFunc.js
|   |   |- toastPopup.js
|   |   |- toggleBtnState.js
|   |- bookmarks.js
|   |- main.js
|
|- images/🖼
|
|- index.html
```

<br>
<br>

## 🧶 기술 스택
<div align="left">

### Environment
<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=https://upload.wikimedia.org/wikipedia/commons/a/a7/Visual_Studio_Code_1.35_icon.svg&logoColor=white" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />

<br>

### Development
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/themoviedatabase-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" />


</div>
