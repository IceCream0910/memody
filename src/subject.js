var subjectTitle;
var categoryTitleInput = $('#categoryTitleInput');
var categoryTitleEditedInput = $('#categoryTitleEditedInput');

var categoryList = []; //


function init() {
    subjectTitle = decodeURI(getParam("title"));
    $('.subjectTitle').html(subjectTitle);
    //저장된 데이터 로딩
    if (localStorage.getItem("stu_categoryList_of_" + subjectTitle) != null) {
        categoryList = JSON.parse(localStorage["stu_categoryList_of_" + subjectTitle]); //과목 리스트 가져오기
        console.log(categoryList);
        for (var i = 0; i < categoryList.length; i++) {
            $('.category-container').append('<div class="listCard" style="border-left: 4px solid ' + getRandomColor() + ';"><h4 id="card-title" onclick="javascript:openCategory(\'' + categoryList[i] + '\');">#' + categoryList[i] + '</h4><a class="card-more" data-toggle="modal" data-target="#editList-modal" href="javascript:openListEditor(' + i + ');"><ion-icon name="ellipsis-vertical-outline" id="more-btn" onclick="javascript:openListEditor(' + i + ');"></ion-icon></a></div>');

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

function getRandomColor() {
    random = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return random;
}



function addList() { //과목 저장 버튼 클릭
    if (categoryList.indexOf(categoryTitleInput.val().toString()) == -1) {


        if (categoryTitleInput.val().toString() == "" | categoryTitleInput.val().toString() == " ") {
            $('#error').show();
            setTimeout(function() {
                $('#error').hide();
            }, 3000);

        } else {
            categoryList.push(categoryTitleInput.val());
            categoryTitleInput.val('');

            localStorage.setItem("stu_categoryList_of_" + subjectTitle, JSON.stringify(categoryList)); //json 데이터 수정해서 저장

            location.reload();
        }

    } else { //중복 이름
        $('#error_2').show();
        setTimeout(function() {
            $('#error_2').hide();
        }, 3000);
    }

}


var currentEditTarget;

function openListEditor(data) { //삼선 버튼 눌렀을 때, data = 배열 index 값
    currentEditTarget = data;
    console.log(categoryList[data]);
    categoryTitleEditedInput.val(categoryList[data]);
    $('.delete-btn').html('<a onclick="javascript:deleteList(' + data + ');"><ion-icon name="trash-outline"></ion-icon></a>');
}

function editedSaveCategoryInfo() { //과목 정보 편집 저장 클릭
    if (categoryList.indexOf(categoryTitleEditedInput.val().toString()) == -1) {


        if (categoryTitleEditedInput.val().toString() == "" | categoryTitleEditedInput.val().toString() == " ") {
            $('#error2').show();
            setTimeout(function() {
                $('#error2').hide();
            }, 3000);

        } else {
            categoryList[currentEditTarget] = categoryTitleEditedInput.val();
            categoryTitleEditedInput.val('');

            localStorage.setItem("stu_categoryList_of_" + subjectTitle, JSON.stringify(categoryList)); //json 데이터 수정해서 저장

            location.reload();
        }
    } else { //중복 이름
        $('#error2_2').show();
        setTimeout(function() {
            $('#error2_2').hide();
        }, 3000);
    }

}

function deleteList(index) {
    if (confirm("이 과목을 정말 삭제할거야? 세트 내에 있는 데이터가 모두 사라져.") == true) {
        localStorage.removeItem("stu_cardsList_of_" + categoryList[index] + "_" + subjectTitle); //하위 데이터(cardsList) 삭제

        categoryList.splice(index.toString(), "1");
        categoryTitleEditedInput.val('');

        localStorage.setItem("stu_categoryList_of_" + subjectTitle, JSON.stringify(categoryList)); //category 리스트에서 해당 항목 삭제



        location.reload();
    } else {
        return;
    }

}

function openCategory(title) { //제목 클릭 > 링크 이동
    window.open('setview.html?title=' + title + '&subject=' + subjectTitle);
}