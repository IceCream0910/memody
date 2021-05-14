//디데이 종료 일자 설정
var countDownDate = new Date().getTime();
// 컴포넌트 매칭
var ddayTitleInput = $('#ddayTitleInput');
var ddayDateInput = $('#ddayDateInput');
var subjectTitleInput = $('#subjectTitleInput');
var subjectEditedTitleInput = $('#subjectEditedTitleInput');

var subjectList = []; //

function init() {
    //저장된 데이터 로딩
    if (localStorage.getItem("stu_ddayTitle") != null) {
        $('#dday-title').html(localStorage.getItem("stu_ddayTitle"));
    }
    if (localStorage.getItem("stu_ddayDate") != null) {
        countDownDate = new Date(localStorage.getItem("stu_ddayDate") + " 24:00:00").getTime(); //디데이 날짜 변경
    }
    if (localStorage.getItem("stu_subjectList") != null) {
        subjectList = JSON.parse(localStorage["stu_subjectList"]);; //과목 리스트 가져오기
        console.log(subjectList);
        for (var i = 0; i < subjectList.length; i++) {
            $('.subject-container').append('<div class="listCard" style="border-left: 4px solid ' + getRandomColor() + ';"><h4 id="card-title" onclick="javascript:openList(\'' + subjectList[i] + '\');">' + subjectList[i] + '</h4><a class="card-more" data-toggle="modal" data-target="#editList-modal" href="javascript:openListEditor(' + i + ');"><ion-icon name="ellipsis-vertical-outline" id="more-btn" onclick="javascript:openListEditor(' + i + ');"></ion-icon></a></div>');

        }
    }
    //디데이 표시
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var d = Math.floor(distance / (1000 * 60 * 60 * 24));

    if (d === 0) {
        d = "DAY";
    }

    $('#dday').html("D-" + d);
}

init();


//디데이 코드
var refreshDday = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var d = Math.floor(distance / (1000 * 60 * 60 * 24));

    if (d === 0) {
        d = "DAY";
    }

    $('#dday').html("D-" + d);

}, 60000);
//디데이 코드

function editDdayInfo() { //디데이 수정 버튼 클릭
    console.log(ddayTitleInput.val());
    if (ddayTitleInput.val().toString() == "" || ddayTitleInput.val().toString() == " " || !ddayDateInput.val()) {
        $('#error').show();
        setTimeout(function() {
            $('#error').hide();
        }, 3000);

    } else {
        $('#dday-title').html(ddayTitleInput.val()); //디데이 제목 변경
        localStorage.setItem("stu_ddayTitle", ddayTitleInput.val()); //디데이 제목 저장

        countDownDate = new Date($('#ddayDateInput').val() + " 24:00:00").getTime(); //디데이 날짜 변경
        localStorage.setItem("stu_ddayDate", ddayDateInput.val()); //디데이 날짜 저장

        location.reload();
    }

}

function modalLoad() {
    if ($('#dday-title').html() != "디데이를 설정해봐") {
        ddayTitleInput.val($('#dday-title').html());
    }
    if (localStorage.getItem("stu_ddayDate") != null) {
        ddayDateInput.val(localStorage.getItem("stu_ddayDate"));
    }

}

function getRandomColor() {
    random = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return random;
}

function editSubjectInfo() { //과목 저장 버튼 클릭
    if (subjectList.indexOf(subjectTitleInput.val().toString()) == -1) {


        if (subjectTitleInput.val().toString() == "" | subjectTitleInput.val().toString() == " ") {
            $('#error2').show();
            setTimeout(function() {
                $('#error2').hide();
            }, 3000);

        } else {
            subjectList.push(subjectTitleInput.val());
            subjectTitleInput.val('');

            localStorage.setItem("stu_subjectList", JSON.stringify(subjectList)); //json 데이터 수정해서 저장

            location.reload();
        }
    } else { //중복 이름
        $('#error2_2').show();
        setTimeout(function() {
            $('#error2_2').hide();
        }, 3000);
    }

}


var currentEditTarget;

function openListEditor(data) { //삼선 버튼 눌렀을 때, data = 배열 index 값
    currentEditTarget = data;
    console.log(subjectList[data]);
    subjectEditedTitleInput.val(subjectList[data]);
    $('.delete-btn').html('<a onclick="javascript:deleteList(' + data + ');"><ion-icon name="trash-outline"></ion-icon></a>');
}

function editedSaveSubjectInfo() { //과목 정보 편집 저장 클릭
    if (subjectList.indexOf(subjectEditedTitleInput.val().toString()) == -1) {


        if (subjectEditedTitleInput.val().toString() == "" | subjectEditedTitleInput.val().toString() == " ") {
            $('#error3').show();
            setTimeout(function() {
                $('#error3').hide();
            }, 3000);

        } else {
            subjectList[currentEditTarget] = subjectEditedTitleInput.val();
            subjectEditedTitleInput.val('');

            localStorage.setItem("stu_subjectList", JSON.stringify(subjectList)); //json 데이터 수정해서 저장

            location.reload();
        }
    } else { //중복 이름
        $('#error3_2').show();
        setTimeout(function() {
            $('#error3_2').hide();
        }, 3000);
    }

}

function deleteList(index) {
    if (confirm("이 과목을 정말 삭제할거야? 과목 내에 있는 암기 리스트가 모두 사라져.") == true) {
        var categoryList_forDelete = JSON.parse(localStorage.getItem("stu_categoryList_of_" + subjectList[index]));
        console.log(categoryList_forDelete);
        for (var i = 0; i < categoryList_forDelete.length; i++) {
            localStorage.removeItem("stu_cardsList_of_" + categoryList_forDelete[i] + "_" + subjectList[index]); //하위 데이터(cardsList) 삭제
        }

        localStorage.removeItem("stu_categoryList_of_" + subjectList[index]); //하위 데이터(categoryList) 삭제


        subjectList.splice(index.toString(), "1");
        localStorage.setItem("stu_subjectList", JSON.stringify(subjectList)); //json 데이터 수정해서 저장
        subjectEditedTitleInput.val('');


        location.reload();
    } else {
        return;
    }

}

function openList(title) { //제목 클릭 > 링크 이동
    window.open('subject.html?title=' + title);
}