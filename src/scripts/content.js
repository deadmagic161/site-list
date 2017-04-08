var name = location.hostname;
var port = chrome.runtime.connect();
var showMessage = false;
var confirmedMessage = false;

port.postMessage({site: name});
port.onMessage.addListener(function(msg){
	if(!showMessage){
		var block = createElement('div');
		block.setAttribute('class', 'message__block');
		var body = document.querySelector('body');


		var text = document.createElement('h3');
		text.innerHTML = msg + 'Кликните "Закрыть" и этого сообщения больше не будет';
		block.appendChild(text);

		var ok = document.createElement('a');
		ok.setAttribute('class', 'message__button');
		ok.setAttribute('href', '#close');
		ok.innerHTML = 'Закрыть';

		ok.onclick = function(){
			confirmedMessage = true;
			body.removeChild(block);
			port.postMessage({site: name, flag: confirmedMessage});

		};
		block.appendChild(ok);

		var button_postpone = document.createElement('a');
		button_postpone.setAttribute('href', '#postpone');
		button_postpone.setAttribute('class', 'message__button');
		button_postpone.innerHTML = 'Отложить';
		button_postpone.onclick = function(){
			confirmedMessage = false;
			body.removeChild(block);
			port.postMessage({site: name, flag:confirmedMessage});

			};

			block.appendChild(button_postpone);
			body.appendChild(block);
			showMessage = true;

		}
	});
