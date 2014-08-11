 class Sun {
	constructor(public dawn: string, public rise: string, public set: string, public dark: string)
	{
	}
	
	static fromJson(json) {
        return new Sun(json.dawn, json.rise, json.set, json.dark);
    }
}

class Moon {
	constructor(public rise: string, public set: string)
	{
	}
	
	static fromJson(json) {
        return new Moon(json.rise, json.set);
    }
}

class Tide {
	constructor(public time: string, public height: number)
	{
	}
	
	static fromJson(json) {
        return new Tide(json.time, json.height);
    }
}

class HalfDay{
	constructor(public high: Tide, public low: Tide)
	{
	}
	
	static fromJson(json) {
        return new HalfDay(json.high, json.low);
    }
}

class Weather {
    constructor(public day: number, public sun: Sun, public moon: Moon, public am: HalfDay, public pm: HalfDay) {
    }

    static fromJson(json) {
        return new Weather(json.day, json.sun, json.moon, json.am, json.pm);
    }
}

$.getJSON("weather.json", function (json) {
    var weekdays: string[] = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var days: Weather[] = [];
    for (var i = 0; i < json.length; ++i) {
        days.push(Weather.fromJson(json[i]));
    }

    var calendar: HTMLElement = document.getElementById('weather_calendar');
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
        var dawn = document.createElement('tr');
        dawn.innerHTML = '<td style="text-align:right">Dawn Breaks:</td><td>' + days[i].sun.dawn + '</td>';
        day_body.appendChild(dawn);
        var sunrise = document.createElement('tr');
        sunrise.innerHTML = '<td style="text-align:right">Sunrise:</td><td>' + days[i].sun.rise + '</td>';
        day_body.appendChild(sunrise);
        var sunset = document.createElement('tr');
        sunset.innerHTML = '<td style="text-align:right">Sunset:</td><td>' + days[i].sun.set + '</td>';
        day_body.appendChild(sunset);
		var dusk = document.createElement('tr');
        dusk.innerHTML = '<td style="text-align:right">Dark Descends:</td><td>' + days[i].sun.dark + '</td>';
        day_body.appendChild(dusk);
		var moonrise = document.createElement('tr');
        moonrise.innerHTML = '<td style="text-align:right">Moonrise:</td><td>' + days[i].moon.rise + '</td>';
        day_body.appendChild(moonrise);
		var moonset = document.createElement('tr');
        moonset.innerHTML = '<td style="text-align:right">Moonset:</td><td>' + days[i].moon.set + '</td>';
        day_body.appendChild(moonset);
		var hightide = document.createElement('tr');
        hightide.innerHTML = '<td style="text-align:right">High tide:</td><td>'
		+ days[i].am.high.time + '<sup>@' + days[i].am.high.height + 'ft</sup>'
		+ ' ' + days[i].pm.high.time + '<sup>@' + days[i].pm.high.height + 'ft</sup>' + '</td>';
        day_body.appendChild(hightide);
		var lowtide = document.createElement('tr');
        lowtide.innerHTML = '<td style="text-align:right">Low tide:</td><td>'
		+ days[i].am.low.time + '<sup>@' + days[i].am.low.height + 'ft</sup>'
		+ ' ' + days[i].pm.low.time + '<sup>@' + days[i].pm.low.height + 'ft</sup>' + '</td>';
        day_body.appendChild(lowtide);
        day_div.appendChild(day_body);
        day_li.appendChild(day_div);
        cal_list.appendChild(day_li);
    }
    calendar.appendChild(cal_list);
});
