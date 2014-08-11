// taken from http://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file/15250208#15250208
var pages = [ ["food.html", "Meal Plan"], ["calendar.html", "Calendar"], ["events.html", "Activities"], ["weather.html", "Weather"] ];

document.write('<div class="nav_div">\
                    <nav class="nav_menu">');
for(var i = 0; i < pages.length; ++i)
{
    document.write('<a ');
    if (pages[i][0] === location.pathname.substring(1))
    {
        document.write('class="selected" ');
    }
    document.write('href="' + pages[i][0] + '">' + pages[i][1] + '</a>');
}
document.write('    </nav>\
                </div>');
