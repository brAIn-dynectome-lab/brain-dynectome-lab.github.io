function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return `${months[parseInt(month) - 1]} ${day}, ${year}`;
}

// Map type -> icon class
function getIconClass(type) {
  switch (type) {
    case 'paper':
      return 'bi bi-newspaper';
    case 'poster':
      return 'bi bi-easel';
    case 'celebration':
      return 'bi bi-award';
    default:
      return 'bi bi-newspaper'; // fallback
  }
}

(function () {
  console.log('news.js running');

  const container = document.querySelector('.news, .news-list');
  if (!container) {
    console.log('No news container found');
    return;
  }

  console.log('Found container:', container.className);
  container.innerHTML = 'Loading...';

  // state for filtering
  let allNews = [];
  let currentFilter = 'all';

  function renderNews() {
    const isTeaser = container.classList.contains('news-list');
    const limit = isTeaser ? 3 : Infinity;

    const filtered = allNews.filter(item => {
      if (currentFilter === 'all') return true;
      return item.type === currentFilter;
    });

    const recent = filtered.slice().reverse().slice(0, limit);

    container.innerHTML = '';

    if (isTeaser) {
      recent.forEach(item => {
        const li = document.createElement('li');
        li.className = 'news-item';
        li.innerHTML = `
          <strong>${formatDate(item.date)}:</strong> ${item.summary}
          <a href="./news.html">Read more →</a>
        `;
        container.appendChild(li);
      });
    } else {
      recent.forEach(item => {
        const div = document.createElement('div');
        div.className = 'news-item';
        const iconClass = getIconClass(item.type);
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <i class="${iconClass}" style="flex-shrink: 0; font-size: 1.1em;"></i>
                <h4 style="margin: 0;">${item.title}</h4>
            </div>
            <span class="news-date">${formatDate(item.date)}</span>
            <p>${item.summary}</p>
            ${item.link ? `<a href="${item.link}" target="_blank">Read more →</a>` : ''}
            `;
        container.appendChild(div);
      });
    }
  }

  fetch('../data/news.json')
    .then(r => {
      console.log('Fetch status:', r.status);
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(newsData => {
      console.log('Loaded', newsData.length, 'news items');
      allNews = newsData;
      renderNews();
    })
    .catch(e => {
      console.error('News error:', e);
      const isTeaser = container.classList.contains('news-list');
      container.innerHTML = isTeaser
        ? '<li class="news-item">News loading...</li>'
        : '<p>News temporarily unavailable</p>';
    });

  // hook up filter buttons (only present on news.html)
  const filterButtons = document.querySelectorAll('.news-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderNews();
    });
  });
})();