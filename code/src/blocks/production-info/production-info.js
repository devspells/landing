import lightLogo from './production-info__logo_light.svg';
import darkLogo from './production-info__logo_dark.svg';


function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

const renderTemplate = params => (`
  <div class="production-info">
    <a target="_blank" href="https://computerization.dev?from=${params.project}" rel="noopener noreferrer">
      <img
        class="production-info__logo"
        alt="компьютеризация логотип"
        title="Компьютеризация - разработка и поддержка сайта"
        src="assets/${params.theme === 'dark' ? darkLogo : lightLogo}"
      >
    </a>

    <p class="production-info__text">
      <a
        class="production-info__link ${params.theme === 'dark' && 'production-info__link_dark'}"
        target="_blank"
        href="https://computerization.dev"
        rel="noopener noreferrer"
      >
        разработка сайта
      </a>
    </p>
  </div>
`);

window.addEventListener('load', () => {
  const params = parseQuery(window.location.search);

  document.body.insertAdjacentHTML('afterbegin', renderTemplate(params));
});
