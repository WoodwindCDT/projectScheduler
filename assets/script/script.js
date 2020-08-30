$(document).ready(function() {
    // Current Date from Moment
    const now = moment().format('LL');

    // Setting Date at top of page
    let pageDate = $('#currentDay');
    $(pageDate).text(now);

    var scheduler = JSON.parse(localStorage.getItem("scheduler")) || startScheduler();

    for (var hour in scheduler) {
        var tr = $("<tr>")
        .addClass("row data-row")
        var divTime = $("<td>")
        .addClass("col-2 time-block hour")
        .text(hour);
        var textEvent = $("<td>")
        .addClass("textDisplay col-9")
        
        var currHr;

        if (moment(hour, "h a").isSame(moment(), "hour")) {
            currHr = "present";
        }
        else if (moment(hour, "h a").isAfter(moment())) {
            currHr = "future";
        }
        else if (moment(hour, "h a").isBefore(moment())) {
            currHr = "past";
        }

        var divText = $("<textarea>")
        .addClass("description")
        .addClass(currHr)
        .attr('data-time', hour)
        .val(scheduler[hour]);

        divText.appendTo(textEvent);

        var divSave = $("<td>")
        .addClass("col-1 button-area saveBtn");

        var checkMark = $("<span>")
        .addClass("oi oi-check");

        checkMark.appendTo(divSave);

        tr.append(divTime, textEvent, divSave);

        tr.appendTo($("#rowStart"));
    };

    function startScheduler() {
        var tempArr = {};

        for (var i = 9; i < 18; i++) {
            tempArr[moment(i, "H").format("h a")] = "";
        }
        return tempArr;
    }

    $(".saveBtn").on("click", function() {
        var hours = $(this)
        .parent()
        .find(".description")
        .attr("data-time");
        var text = $(this)
        .parent()
		.find(".description")
        .val();

        scheduler[hours] = text;

        localStorage.setItem("scheduler", JSON.stringify(scheduler));
    });

    $(".clearBtn").on("click", function() {
        window.localStorage.clear();
        $("textarea").val("");
    });
});