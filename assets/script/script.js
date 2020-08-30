$(document).ready(function() {
    // Current Date from Moment
    const now = moment().format('LL');

    // Setting Date at top of page
    let pageDate = $('#currentDay');
    $(pageDate).text(now);

    // LocalStorage Initiation
    var scheduler = JSON.parse(localStorage.getItem("scheduler")) || startScheduler();

    // Loop to create Table sections with corresponding classes
    for (var hour in scheduler) {
        var tr = $("<tr>")
        .addClass("row data-row")
        var divTime = $("<td>")
        .addClass("col-2 time-block hour")
        .text(hour);
        var textEvent = $("<td>")
        .addClass("textDisplay col-9")
        
        // Current Hour
        var currHr;

        // To set textarea background color corresponding to the current Hour
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
        // data-time creates a attribute to pull data from
        // Create a data-time = "hour" EX: data-time = "4 pm"
        .attr('data-time', hour)
        // enabling localStorage value to equal [hour] 
        // EX : 4pm created via '.attr('data-time', hour)'
        .val(scheduler[hour]);

        // Appending Table element section
        divText.appendTo(textEvent);

        var divSave = $("<td>")
        .addClass("col-1 button-area saveBtn");

        var checkMark = $("<span>")
        .addClass("oi oi-check");

        checkMark.appendTo(divSave);

        tr.append(divTime, textEvent, divSave);

        tr.appendTo($("#rowStart"));
    };

    // Function to create Array and Save inner textarea content to a string
    // Text area content is being pulled by parent .find(.description)
    function startScheduler() {
        var tempArr = {};

        // Looping to create array value content to prepare
        // for saving tasks to key:Scheduler with EX: 9am: "" 
        // "" = textcontent and 9am is pulled from moment in time block
        for (var i = 9; i < 18; i++) {
            tempArr[moment(i, "H").format("h a")] = "";
        }
        return tempArr;
    }

    // Save button Input
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

        // Setting content within local storage to the scheduler array
        localStorage.setItem("scheduler", JSON.stringify(scheduler));
    });

    // Clear button to reset all saved key / input value
    // and clearing/re-setting text content in textarea
    $(".clearBtn").on("click", function() {
        window.localStorage.clear();
        $("textarea").val("");
    });
});