function init() {

    if (localStorage["stu_settings_quizRandom"] == 'true') {
        console.log('got');
        $(".quizRandom").prop("checked", true);
    } else {
        $(".quizRandom").prop("checked", false);
    }

    if (localStorage["stu_settings_isFirstAns"] == 'true') {
        console.log('got');
        $(".isFirstAns").prop("checked", true);
    } else {
        $(".isFirstAns").prop("checked", false);
    }
}

init();

$('.quizRandom').click(function() {
    if ($(this).is(':checked')) {
        console.log(true);
        localStorage.setItem("stu_settings_quizRandom", 'true');

    } else {
        console.log(false);
        localStorage.setItem("stu_settings_quizRandom", 'false');
    }
});

$('.isFirstAns').click(function() {
    if ($(this).is(':checked')) {
        localStorage.setItem("stu_settings_isFirstAns", 'true');
        $('#isFirstAnsDes').html('현재설정 : 정답 보고 질문 맞히기');
    } else {
        localStorage.setItem("stu_settings_isFirstAns", 'false');
        $('#isFirstAnsDes').html('현재설정 : 질문 보고 정답 맞히기');
    }
});



function deleteConfirm() {
    $('#error').hide();
    if ($('#delConfirm').val() == '삭제') {
        deleteAllData();

    } else {
        $('#error').show();
        setTimeout(function() {
            $('#error').hide();
        }, 3000);
    }
}

function deleteAllData() {
    var subjectList_forD = JSON.parse(localStorage.getItem("stu_subjectList"));
    for (var i = 0; i < subjectList_forD.length; i++) {
        var categoryList_forD = JSON.parse(localStorage.getItem("stu_categoryList_of_" + subjectList_forD[i]));
        for (var j = 0; j < categoryList_forD.length; j++) {
            localStorage.removeItem("stu_cardsList_of_" + categoryList_forD[j] + "_" + subjectList_forD[i]); //과목 카테고리 하위 데이터(cardsList) 삭제
        }
        localStorage.removeItem("stu_categoryList_of_" + subjectList_forD[i]); // 과목 카테고리 데이터(categorylist) 삭제
    }


    localStorage.removeItem("stu_subjectList"); //과목 데이터(subjectList) 삭제
    localStorage.removeItem("stu_settings_quizRandom"); //설정 데이터(quizRandom) 삭제
    localStorage.removeItem("stu_settings_isFirstAns"); //설정 데이터(quizRandom) 삭제
    localStorage.removeItem("stu_ddayDate"); //디데이 데이터(ddayDate) 삭제
    localStorage.removeItem("stu_ddayTitle"); //디데이 데이터(ddayTitle) 삭제



    location.reload();
}