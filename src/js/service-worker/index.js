
self.addEventListener('fetch', (event) => {
  alert('Качаю')
  alert( event)
});

self.addEventListener('activate', (event) => {
  alert('Активен')
  alert( event)
});

self.addEventListener('update', (event) => {
  alert('Активен')
  alert( event)
});