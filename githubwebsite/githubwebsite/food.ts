/// <reference path="jquery.d.ts" />

class Day {
    constructor(public day: number, public chef1: string, public chef2: string, public chef3: string) {
    }

    // taken from: http://stackoverflow.com/questions/17449074/parsing-json-from-typescript-restores-data-members-but-not-type-cannot-call-met/17449450#17449450
    static fromJson(json) {
        return new Day(json.day, json.chef1, json.chef2, json.chef3);
    }
}

class Allergy {
    constructor(public person: string, public reaction: number, public food: string) {
    }

    Reaction() {
        switch (this.reaction) {
            default:
            case 0:
                return "likes";
            case 1:
                return "is allergic to";
            case 2:
                return "does not like";
        }
    }

    static fromJson(json) {
        return new Allergy(json.person, json.reaction, json.food);
    }
}

$.getJSON("food.json", function (json) {
    var weekdays: string[] = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var days: Day[] = [];
    for (var i = 0; i < json.calendar.length; ++i) {
        days.push(Day.fromJson(json.calendar[i]));
    }
    var allergies: Allergy[] = [];
    for (var i = 0; i < json.allergies.length; ++i) {
        allergies.push(Allergy.fromJson(json.allergies[i]));
    }

    var calendar: HTMLElement = document.getElementById('meal_calendar');
    var cal_list = document.createElement('ul');
    cal_list.setAttribute('class', 'calendar');
    for (var i = 0; i < days.length; ++i) {
        var day_li = document.createElement('li');
        var day_div = document.createElement('div');
        var day_header = document.createElement('p');
        day_header.setAttribute('class', 'date_header');
        if (days[i].day >= 0) {
            day_header.innerHTML = weekdays[days[i].day % weekdays.length] + ' <sup>' + (18 + days[i].day).toString() + '</sup>';
        }
        else {
            day_header.innerHTML = 'Anytime!';
        }
        day_div.appendChild(day_header);
        var day_body = document.createElement('table');
        var breakfast = document.createElement('tr');
        breakfast.innerHTML = '<td style="text-align:right">Breakfast:</td><td>'
        + ((days[i].chef1 === "") ? '<button style="font-size: 12px;border-radius:0px;" '
        + 'class="button" onclick="add_chef_show('
        + days[i].day + ',1)">assign</button>' : days[i].chef1) + '</td>';
        day_body.appendChild(breakfast);
        var lunch = document.createElement('tr');
        lunch.innerHTML = '<td style="text-align:right">Lunch:</td><td>'
        + ((days[i].chef2 === "") ? '<button style="font-size: 12px;border-radius:0px;" '
        + 'class="button" onclick="add_chef_show('
        + days[i].day + ',2)">assign</button>' : days[i].chef2) + '</td>';
        day_body.appendChild(lunch);
        var dinner = document.createElement('tr');
        dinner.innerHTML = '<td style="text-align:right">Dinner:</td><td>'
        + ((days[i].chef3 === "") ? '<button style="font-size: 12px;border-radius:0px;" '
        + 'class="button" onclick="add_chef_show('
        + days[i].day + ',3)">assign</button>' : days[i].chef3) + '</td>';
        day_body.appendChild(dinner);
        day_div.appendChild(day_body);
        day_li.appendChild(day_div);
        cal_list.appendChild(day_li);
    }
    calendar.appendChild(cal_list);

    var allergy: HTMLElement = document.getElementById('allergy_list');
    var algy_list = document.createElement('ul');
    algy_list.setAttribute('class', 'side-list');
    for (var i = 0; i < allergies.length; ++i) {
        var algy_li = document.createElement('li');
        algy_li.innerHTML = '<p>' + allergies[i].person + ' ' + allergies[i].Reaction() + ' ' + allergies[i].food + '</p>';
        algy_list.appendChild(algy_li);
    }
    allergy.appendChild(algy_list);
});

function algy_show() {
    document.getElementById('preference_div').style.display = "block";
}

function algy_hide() {
    document.getElementById('preference_div').style.display = "none";
}

function algy_submit() {
    var allergy: Allergy = new Allergy((<HTMLInputElement>document.getElementById("form_person")).value,
        +(<HTMLSelectElement>document.getElementById("form_reaction")).value,
        (<HTMLInputElement>document.getElementById("form_food")).value);

    $.ajax({
        type: "POST",
        //url: "http://samandlorien.zxq.net/upload.php",
        url: "upload.php",
        data: { 'food_allergy': allergy },
        /*contentType: "application/json; charset=utf-8",*/
        success: function (data) {
            location.reload(true);
            console.log(data);
            window.location.replace("food.html");
        },
        error: function (e) {
            alert("tears and sadness :'(");
            console.log(e);
        }
    });
}

function add_chef_show(day, time) {
    document.getElementById('new_chef_div').style.display = "block";
    (<HTMLInputElement>document.getElementById("form_day")).value = day;
    (<HTMLInputElement>document.getElementById("form_meal")).value = time;
}

function add_chef_hide() {
    document.getElementById('new_chef_div').style.display = "none";
}

function add_chef_submit() {
    var day = (<HTMLInputElement>document.getElementById("form_day")).value;
    var time = (<HTMLInputElement>document.getElementById("form_meal")).value;
    var chef = (<HTMLInputElement>document.getElementById("form_chef")).value;
    var new_chef = { "day": day, "time": time, "chef": chef };

    $.ajax({
        type: "POST",
        url: "upload.php",
        data: { 'new_chef': new_chef },
        success: function (data) {
            location.reload(true);
            console.log(data);
            window.location.replace("food.html");
        },
        error: function (e) {
            alert("tears and sadness :'(");
            console.log(e);
        }
    });
}