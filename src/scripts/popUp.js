$.getJSON('http://www.softomate.net/ext/employees/list.json', function(data){
	var list = $('#popup_list');
	var item;
	var link;
	for (var i = 0; i < data.length; i++) {
		item = document.createElement('li');
		item.setAttribute('class', 'site__item');

		link = document.createElement('a');
		link.innerHTML = data[i].name;
		link.setAttribute('class', 'site__link');
		link.setAttribute('href', 'https://www.'+data[i].domain);
		link.setAttribute('target', '_blank');

		$(item).append(link);
		$(list).append(item);
	}
});