/// <reference path="jquery.d.ts" />

class Day {
    constructor(public day: number, public chef1: string, public chef2: string, public chef3: string) {
    }

    Day() { return this.day; }

    // taken from: http://stackoverflow.com/questions/17449074/parsing-json-from-typescript-restores-data-members-but-not-type-cannot-call-met/17449450#17449450
    static fromJson(json) {
        return new Day(json.day, json.chef1, json.chef2, json.chef3);
    }
}

$.getJSON("food.json", function (json_days) {
    var weekdays: string[] = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var days: Day[] = [];
    for (var i = 0; i < json_days.length; i++) {
        days.push(Day.fromJson(json_days[i]));
    }

    var calendar: HTMLElement = document.getElementById('meal_calendar');

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