window.addEventListener('load', function() {
  const components = document.querySelectorAll('.js-main-nav__item');

  Array.from(components).forEach(wrapper => {
    const item = wrapper.querySelector('a');
    console.log(item);

    if (item.href !== location.href) return;

    wrapper.classList.add('main-nav__item_active');
  });
});
