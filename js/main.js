document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const form = document.querySelector('.contact-form');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessKey = form.access_key.value;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      status.textContent = 'Форма ещё не подключена — нужен ключ Web3Forms.';
      status.className = 'form-status err';
      return;
    }

    status.textContent = 'Отправка...';
    status.className = 'form-status';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();

      if (data.success) {
        status.textContent = 'Сообщение отправлено, спасибо!';
        status.className = 'form-status ok';
        form.reset();
      } else {
        status.textContent = 'Не удалось отправить. Попробуйте позже.';
        status.className = 'form-status err';
      }
    } catch (err) {
      status.textContent = 'Ошибка сети. Попробуйте позже.';
      status.className = 'form-status err';
    }
  });
}
