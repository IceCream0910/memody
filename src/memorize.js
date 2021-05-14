var categoryTitle = decodeURI(getParam("category"));
var subjectTitle = decodeURI(getParam("subject"));
var datasets = JSON.parse(localStorage["stu_cardsList_of_" + categoryTitle + "_" + subjectTitle]);
console.log(categoryTitle, subjectTitle, datasets);
var questions = [];
var answers = [];
var toolbar = $('.toolbar');
var content = $('.contentView');
var isQ = 'tutorial';
var qCnt = 0;

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

for (var i = 0; i < datasets.length; i++) {
    questions[i] = datasets[i][0];
    answers[i] = datasets[i][1];
}

console.log(questions, answers);

//페이지 전역 클릭 감지
$(document).mousedown(function(e) {
    if (!$(e.target).is("#exitBtn") && !$(e.target).is("#tb_Btn")) { //종료, 툴바 버튼 클릭 제외
        //카드 전환
        changeCard();
    }
});

function changeCard() {
    if (!qCnt >= datasets.length && isQ != 'end') {
        if (isQ == 'tutorial') { //현재 카드가 튜토리얼이면
            content.html(questions[qCnt]);
            isQ = 'true';
        } else if (isQ == 'true') { //현재 카드가 문제이면
            content.html(questions[qCnt] + '<br><br>정답 : <br>' + answers[qCnt]);
            isQ = 'answer';
            toolbar.show();
            qCnt++;
        } else { //현재 카드가 정답이면
            content.html(questions[qCnt]);
            toolbar.hide();
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
    datasets[qCnt - 1][2] = value;
    localStorage.setItem("stu_cardsList_of_" + categoryTitle + "_" + subjectTitle, JSON.stringify(datasets)); //json 데이터 수정해서 저장
    changeCard();
}