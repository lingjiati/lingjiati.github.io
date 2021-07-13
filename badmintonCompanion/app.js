
	window.addEventListener('load', function(){
		if('serviceWorker' in navigator){
			navigator.serviceWorker.register('sw.js')
				.then(() => console.log('service worker registered'))
				.catch((er) => console.log('servide worker not registered', er))
			}
	})
