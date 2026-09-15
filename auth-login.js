const params = new URLSearchParams(window.location.search);
const destination = params.get('next') === 'admin' ? 'admin' : 'portal';
window.location.replace(destination === 'admin'
  ? 'https://admin.reaperai.com/login.html'
  : 'https://portal.reaperai.com/login.html');
