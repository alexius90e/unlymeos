import './custom-select.js'

const headerAuth = document.querySelector('.header__auth');

if (headerAuth) {
  headerAuth.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const isLogin = event.target.classList.contains('header__auth-login');
    const isSingup = event.target.classList.contains('header__auth-singup');

    if (isLayout) event.currentTarget.classList.toggle('active');

    if (isLogin || isSingup) event.currentTarget.classList.remove('active');
  });
}
