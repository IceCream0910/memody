var categoryTitle = decodeURI(getParam("category"));
var subjectTitle = decodeURI(getParam("subject"));
var datasets = JSON.parse(localStorage["stu_cardsList_of_" + categoryTitle + "_" + subjectTitle]);
var isRandom = localStorage["stu_settings_quizRandom"];
var isFirstAns = localStorage["stu_settings_isFirstAns"];
var questions = [];
var answers = [];
var toolbar = $('.toolbar');
var content = $('.contentView');
var isQ = 'tutorial';
var qCnt = 0;
var questionNum = [];

$('.testTitle').html("암기 확인 :<br>" + subjectTitle + ">" + categoryTitle);
toolbar.hide();

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

// Array의 prototype을 지정해주고, shuffle이라는 이름을 가진 함수를 생성
Array.prototype.shuffle = function() {
    var length = this.length;
    // 아래에서 length 후위 감소 연산자를 사용하면서 결국 0이된다.
    // 프로그래밍에서 0은 false를 의미하기에 0이되면 종료.
    while (length) {
        // 랜덤한 배열 index 추출
        var index = Math.floor((length--) * Math.random());
        // 배열의 끝에서부터 0번째 아이템을 순차적으로 대입
        var temp = this[length];
        // 랜덤한 위치의 값을 맨뒤(this[length])부터 셋팅
        this[length] = this[index];
        // 랜덤한 위치에 위에 설정한 temp값 셋팅
        this[index] = temp;
    }
    return this;
};



if (isRandom == 'true') {
    datasets.shuffle(); //랜덤 섞기
    console.log(datasets);
}

for (var i = 0; i < datasets.length; i++) {
    if (isFirstAns == 'true') { //정답 먼저
        answers[i] = datasets[i][0];
        questions[i] = datasets[i][1];
        questionNum[i] = datasets[i][3];
    } else { //질문 먼저
        questions[i] = datasets[i][0];
        answers[i] = datasets[i][1];
        questionNum[i] = datasets[i][3];
    }
}

console.log(questionNum);


//페이지 전역 클릭 감지
$(document).mousedown(function(e) {
    if (!$(e.target).is("#exitBtn") && !$(e.target).is("#tb_Btn")) { //종료, 툴바 버튼 클릭 제외
        //카드 전환
        changeCard();
    }
});

function changeCard() {
    if (qCnt < datasets.length && isQ != 'end') {
        if (isQ == 'tutorial') { //현재 카드가 튜토리얼이면
            content.html(questions[qCnt]);
            isQ = 'true';
        } else if (isQ == 'true') { //현재 카드가 문제이면
            content.html(questions[qCnt] + '<br><br>정답 : <br>' + answers[qCnt]);
            isQ = 'false';
            toolbar.show();
            qCnt++;
        } else { //현재 카드가 정답이면
            content.html(questions[qCnt]);
            toolbar.hide();
            isQ = 'true';
        }
    } else if (isQ == 'end') {
        window.top.close();
    } else { //모든 문제 종료
        content.html('학습을 모두 끝냈어요! 한 번 더 클릭하면 학습을 종료할게요.');
        toolbar.hide();
        isQ = 'end'
    }
}

function changeStatus(value) {
    var originalDatasets = JSON.parse(localStorage["stu_cardsList_of_" + categoryTitle + "_" + subjectTitle]);
    console.log(originalDatasets);
    originalDatasets[questionNum[qCnt - 1] - 1][2] = value;
    localStorage.setItem("stu_cardsList_of_" + categoryTitle + "_" + subjectTitle, JSON.stringify(originalDatasets)); //json 데이터 수정해서 저장
    isQ = 'false';
    changeCard();
}