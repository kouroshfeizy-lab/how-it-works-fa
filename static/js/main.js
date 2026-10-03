const menuButton = document.querySelector('.menu-button');
const primaryNav = document.querySelector('.primary-nav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
    });
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const topicCards = document.querySelectorAll('.topic-card[data-group]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    topicCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.group !== filter);
    });
  });
});

document.querySelectorAll('[data-jump]').forEach((button) => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.jump)?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-tabs]').forEach((tabs) => {
  const buttons = [...tabs.querySelectorAll('[data-tab-target]')];
  const panels = [...tabs.querySelectorAll('[data-tab-panel]')];

  const selectTab = (button) => {
    const target = button.dataset.tabTarget;
    buttons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      const selected = panel.dataset.tabPanel === target;
      panel.hidden = !selected;
      panel.classList.toggle('is-active', selected);
    });
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => selectTab(button));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' ? 1 : -1;
      const next = buttons[(index + direction + buttons.length) % buttons.length];
      selectTab(next);
      next.focus();
    });
  });
});

const revealItems = document.querySelectorAll([
  '.section-heading',
  '.topic-card',
  '.manifesto-grid',
  '.closing-inner',
  '.tabs-heading',
  '.tab-shell',
  '.related-grid',
].join(','));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealItems.forEach((item, index) => {
    item.classList.add('reveal-ready');
    if (item.classList.contains('topic-card')) item.style.transitionDelay = `${(index % 3) * 70}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const articleSections = document.querySelectorAll('.article-body section[id]');
const articleLinks = document.querySelectorAll('.article-aside nav a');

if (articleSections.length && articleLinks.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        articleLinks.forEach((link) => link.classList.remove('is-active'));
        document.querySelector(`.article-aside a[href="#${entry.target.id}"]`)?.classList.add('is-active');
      }
    });
  }, { rootMargin: '-20% 0px -65% 0px' });

  articleSections.forEach((section) => observer.observe(section));
}

