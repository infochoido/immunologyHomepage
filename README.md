# vetmed_jbnu_Immunology_Lab
전북대학교 수의과대학 면역학실험실

# Project guide

## Github push 보내는 방법

-- 우선 issue에 맞는 branch로 변경할 것 --

* 단계
 - stage
 - commit

0. git status 확인
 [빨간색] - git add 사용해서 stage로 올려야 하는 상태
 [초록색] - git commit 사용해서 commit을 올릴 수 있음
1. git add .
2. git commit -m "feat(#1): user interface 작성 및 school, university script 추가"
3. git push origin feature/#1

## Issue

Issue에는 Feature와 Debug를 정리합니다. (향후 추가 예정)\
Title에는 [Feature] 혹은 [Debug]를 앞에 표시 후 타이틀을 작성합니다.

컨텐츠의 양식은 다음과 같습니다.

```plain
작업일

- [ ] 작업 내용 [commit link(사항 있다면)]
```

## Branch

main branch는 feature/(issue id)와 같이 네이밍합니다. ex) feature/#10

* branch 변경 방법

1. git branch feature/#1  -> branch 새로 생성
2. git checkout feature/#1  -> branch 변경
[번외] 한번에 하려면
git checkout -b feature/#1  -> branch 새로 생성 후 변경

* branch 삭제 방법 (로컬)

-- pull request 보낸 후 main branch에 성공적으로 merge 되었을 때 --
git branch -d feature/#1

## Commit

commit은 [git convention](https://www.conventionalcommits.org/en/v1.0.0/)을 따르되, Issue id를 반드시 붙여주셔야 합니다.\
type은 대문자로 시작합니다.

ex)

```plain
# issue id => #1, #2, #3 ...
Feat(#1): 로그인 기능 추가
```

## PR

1. pull request는 commit 하나에만 할당됩니다.

2. pull request를 보내기 전, 본인의 commit 사항에 대해 우선적으로 코드리뷰를 하고 comment를 남깁니다.

3. pull request를 요청한 뒤, 담당 코드 리뷰어와 함께 코드 리뷰를 완료합니다.

4. pull request가 완료되면 요청 보낸 branch는 삭제합니다.

```console
git checkout main
git pull origin main
git branch -d feature/#1
```

> 문서 변경사항에 대해서는 docs branch에 문서 변경사항만 (이외 코드 변경 사항은 반영하지 말것!!) 추가하여 PR을 보내주세요.

## ETC

### vscode

* Prettier 단축키

``` plain
shift + alt + f
```
