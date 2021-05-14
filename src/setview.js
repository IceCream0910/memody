var subjectTitle;
var cardsQInput = $('#cardsQInput');
var cardsAInput = $('#cardsAInput');

var cardsQEditedInput = $('#cardsQEditedInput');
var cardsAEditedInput = $('#cardsAEditedInput');


function create2DArray(rows, columns) { //2차원 배열 생성 함수 e.g.)create2DArray(5, 2);
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
}

var cardsList = create2DArray(0, 3);


function init() {
    categoryTitle = decodeURI(getParam("title"));
    subjectTitle = decodeURI(getParam("subject"));
    $('.subjectTitle').html(categoryTitle);
    //저장된 데이터 로딩
    if (localStorage.getItem("stu_cardsList_of_" + categoryTitle + "_" + subjectTitle) != null) {
        cardsList = JSON.parse(localStorage["stu_cardsList_of_" + categoryTitle + "_" + subjectTitle]); //과목 리스트 가져오기
        console.log(cardsList);
        for (var i = 0; i < cardsList.length; i++) {
            var statusTag;
            var statusText;
            switch (cardsList[i][2]) {
                case "0": //암기안함
                    statusTag = "color:#ff4040;"
                    statusText = "암기 안 함"
                    break;
                case "1": //재암기
                    statusTag = "color:#ff9a03;"
                    statusText = "다시 확인"
                    break;
                case "2": //암기완료
                    statusTag = "color:#23b007;"
                    statusText = "암기 완료"
                    break;
                default:
                    statusTag = "color:#9029ff;"
                    statusText = "알 수 없음"
                    break;
            }
            $('.cards-container').append('<div class="listCard"><span style="' + statusTag + '">' + statusText + '</span><br><span>질문</span> <h4 id="card-q">' + cardsList[i][0] + '</h4> <span>정답</span> <h4 id="card-a">' + cardsList[i][1] + '</h4><a class="card-more"data-toggle="modal" data-target="#editList-modal" href="javascript:openListEditor(' + i + ');"><ion-icon name="ellipsis-vertical-outline" id="more-btn"  onclick="javascript:openListEditor(' + i + ');"></ion-icon></a>  </div>');

        }
    }
}

init();

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




function addList() { // 추가(저장) 버튼 클릭
    if (cardsQInput.val().toString() == "" || cardsQInput.val().toString() == " " || cardsAInput.val().toString() == "" || cardsAInput.val().toString() == " ") {
        $('#error').show();
        setTimeout(function() {
            $('#error').hide();
        }, 3000);

    } else {
        var temp = [cardsQInput.val().toString(), cardsAInput.val().toString(), "0"];
        cardsList.push(temp);
        cardsQInput.val('');
        cardsAInput.val('');
        console.log(cardsList);
        localStorage.setItem("stu_cardsList_of_" + categoryTitle + "_" + subjectTitle, JSON.stringify(cardsList)); //json 데이터 수정해서 저장

        location.reload();
    }

}


var currentEditTarget;

function openListEditor(data) { //삼선 버튼 눌렀을 때, data = 배열 index 값
    currentEditTarget = data;
    cardsQEditedInput.val(cardsList[data][0]);
    cardsAEditedInput.val(cardsList[data][1]);
    $('.delete-btn').html('<a onclick="javascript:deleteList(' + data + ');"><ion-icon name="trash-outline"></ion-icon></a>');
}

function editedSaveCategoryInfo() { //과목 정보 편집 저장 클릭


    if (cardsQEditedInput.val().toString() == "" | cardsQEditedInput.val().toString() == " " || cardsAEditedInput.val().toString() == "" | cardsAEditedInput.val().toString() == " ") {
        $('#error2').show();
        setTimeout(function() {
            $('#error2').hide();
        }, 3000);

    } else {
        cardsList[currentEditTarget][0] = cardsQEditedInput.val();
        cardsList[currentEditTarget][1] = cardsAEditedInput.val();

        cardsQEditedInput.val('');
        cardsAEditedInput.val('');

        localStorage.setItem("stu_cardsList_of_" + categoryTitle + "_" + subjectTitle, JSON.stringify(cardsList)); //json 데이터 수정해서 저장

        location.reload();
    }
}


function deleteList(index) {
    if (confirm("이 과목을 정말 삭제할거야? 세트 내에 있는 데이터가 모두 사라져.") == true) {
        cardsList.splice(index.toString(), "1");
        cardsQEditedInput.val('');
        cardsAEditedInput.val('');

        localStorage.setItem("stu_cardsList_of_" + categoryTitle + "_" + subjectTitle, JSON.stringify(cardsList)); //json 데이터 수정해서 저장

        location.reload();
    } else {
        return;
    }

}

function playQuiz() {
    window.open('memorize.html?category=' + categoryTitle + '&subject=' + subjectTitle);

}