/// <reference path="jquery.d.ts" />
var Day = (function () {
    function Day(day, chef1, chef2, chef3) {
        this.day = day;
        this.chef1 = chef1;
        this.chef2 = chef2;
        this.chef3 = chef3;
    }
    Day.prototype.Day = function () {
        return this.day;
    };

    // taken from: http://stackoverflow.com/questions/17449074/parsing-json-from-typescript-restores-data-members-but-not-type-cannot-call-met/17449450#17449450
    Day.fromJson = function (json) {
        return new Day(json.day, json.chef1, json.chef2, json.chef3);
    };
    return Day;
})();

$.getJSON("food.json", function (json_days) {
    var weekdays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var days = [];
    for (var i = 0; i < json_days.length; i++) {
        days.push(Day.fromJson(json_days[i]));
    }

    var calendar = document.getElementById('meal_calendar');

    var cal_list = document.createElement('ul');
    cal_list.setAttribute('class', 'calendar');
    for (var i = 0; i < days.length; ++i) {
        var day_li = document.createElement('li');
        var day_div = document.createElement('div');
        var day_header = document.createElement('p');
        day_header.setAttribute('class', 'date_header');
        day_header.innerHTML = weekdays[days[i].day % weekdays.length] + ' <sup>' + (18 + days[i].day).toString() + '</sup>';
        day_div.appendChild(day_header);
        var day_body = document.createElement('div');
        var breakfast = document.createElement('p');
        breakfast.innerHTML = 'Breakfast: ' + ((days[i].chef1 === "") ? "[NOT ASSIGNED]" : days[i].chef1);
        day_body.appendChild(breakfast);
        var lunch = document.createElement('p');
        lunch.innerHTML = 'Lunch: ' + ((days[i].chef2 === "") ? "[NOT ASSIGNED]" : days[i].chef2);
        day_body.appendChild(lunch);
        var dinner = document.createElement('p');
        dinner.innerHTML = 'Dinner: ' + ((days[i].chef3 === "") ? "[NOT ASSIGNED]" : days[i].chef3);
        day_body.appendChild(dinner);
        day_div.appendChild(day_body);
        day_li.appendChild(day_div);
        cal_list.appendChild(day_li);
    }
    calendar.appendChild(cal_list);
    //this.element.innerHTML += "The time is: ";
    //this.span = document.createElement('span');
    //this.element.appendChild(this.span);
    //this.span.innerText = new Date().toUTCString();
    //alert(JSON.stringify(days));
});
//# sourceMappingURL=food.js.map
