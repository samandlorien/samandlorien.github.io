/// <reference path="jquery.d.ts" />
var Day = (function () {
    function Day(day, chef1, chef2, chef3) {
        this.day = day;
        this.chef1 = chef1;
        this.chef2 = chef2;
        this.chef3 = chef3;
    }
    // taken from: http://stackoverflow.com/questions/17449074/parsing-json-from-typescript-restores-data-members-but-not-type-cannot-call-met/17449450#17449450
    Day.fromJson = function (json) {
        return new Day(json.day, json.chef1, json.chef2, json.chef3);
    };
    return Day;
})();

var Allergy = (function () {
    function Allergy(person, reaction, food) {
        this.person = person;
        this.reaction = reaction;
        this.food = food;
    }
    Allergy.prototype.Reaction = function () {
        switch (this.reaction) {
            default:
            case 0:
                return "likes";
            case 1:
                return "is allergic to";
            case 2:
                return "does not like";
        }
    };

    Allergy.fromJson = function (json) {
        return new Allergy(json.person, json.reaction, json.food);
    };
    return Allergy;
})();

$.getJSON("food.json", function (json) {
    var weekdays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var days = [];
    for (var i = 0; i < json.calendar.length; ++i) {
        days.push(Day.fromJson(json.calendar[i]));
    }
    var allergies = [];
    for (var i = 0; i < json.allergies.length; ++i) {
        allergies.push(Allergy.fromJson(json.allergies[i]));
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
        var day_body = document.createElement('table');
        var breakfast = document.createElement('tr');
        breakfast.innerHTML = '<td style="text-align:right">Breakfast:</td><td>' + ((days[i].chef1 === "") ? "[NOT ASSIGNED]" : days[i].chef1) + '</td>';
        day_body.appendChild(breakfast);
        var lunch = document.createElement('tr');
        lunch.innerHTML = '<td style="text-align:right">Lunch:</td><td>' + ((days[i].chef2 === "") ? "[NOT ASSIGNED]" : days[i].chef2) + '</td>';
        day_body.appendChild(lunch);
        var dinner = document.createElement('tr');
        dinner.innerHTML = '<td style="text-align:right">Dinner:</td><td>' + ((days[i].chef3 === "") ? "[NOT ASSIGNED]" : days[i].chef3) + '</td>';
        day_body.appendChild(dinner);
        day_div.appendChild(day_body);
        day_li.appendChild(day_div);
        cal_list.appendChild(day_li);
    }
    calendar.appendChild(cal_list);

    var allergy = document.getElementById('allergy_list');
    var algy_list = document.createElement('ul');
    algy_list.setAttribute('class', 'side-list');
    for (var i = 0; i < allergies.length; ++i) {
        var algy_li = document.createElement('li');
        algy_li.innerHTML = '<p>' + allergies[i].person + ' ' + allergies[i].Reaction() + ' ' + allergies[i].food + '</p>';
        algy_list.appendChild(algy_li);
    }
    allergy.appendChild(algy_list);
});
//# sourceMappingURL=food.js.map
