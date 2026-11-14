/**
 * Hanji Redmine Theme — light / dark mode
 * https://github.com/IrumAcademy/Redmine-Hanji-Theme (MIT License)
 *
 * Redmine loads this file in <head>, so the mode is applied before the page is drawn.
 * Until the user picks a mode, it follows the operating system setting.
 * The choice is stored per browser in localStorage (key: redmine_theme).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'redmine_theme';
  var BTN_ID = 'hanji-theme-toggle';
  var BTN_CLASS = 'hanji-theme-toggle';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  var LABELS = {
    ko: { toDark: '어두운 테마로 전환', toLight: '밝은 테마로 전환', dark: '어두운 테마', light: '밝은 테마' },
    en: { toDark: 'Switch to dark theme', toLight: 'Switch to light theme', dark: 'Dark theme', light: 'Light theme' }
  };
  var ICON_MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var ICON_SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  function labels() {
    var lang = (root.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
    return LABELS[lang] || LABELS.en;
  }

  function storedMode() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === 'dark' || v === 'light') return v;
    } catch (e) {}
    return null;
  }

  function isDark() {
    var v = storedMode();
    if (v) return v === 'dark';
    return !!(media && media.matches);
  }

  function apply() {
    var dark = isDark();
    root.classList.add('hanji-theme');
    root.classList.toggle('hanji-dark', dark);
    var buttons = document.querySelectorAll('.' + BTN_CLASS);
    if (!buttons.length) return;
    var l = labels();
    var title = dark ? l.toLight : l.toDark;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = (dark ? ICON_SUN : ICON_MOON) + '<span class="hanji-theme-toggle-label">' + (dark ? l.light : l.dark) + '</span>';
      buttons[i].title = title;
      buttons[i].setAttribute('aria-label', title);
    }
  }

  function createToggle(id) {
    var a = document.createElement('a');
    if (id) a.id = id;
    a.className = BTN_CLASS;
    a.href = '#';
    a.setAttribute('role', 'button');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      try { localStorage.setItem(STORAGE_KEY, isDark() ? 'light' : 'dark'); } catch (err) {}
      apply();
    });
    return a;
  }

  // Redmine 6: the toggle is the first item of the account menu (top right). On phones Redmine
  // moves that menu into the slide-out menu, so the toggle goes along with it.
  // Redmine 7: the account menu is an avatar drop-down, so the toggle goes in front of it as
  // the first item of the profile menu and stays visible. Phones hide that bar, so a second
  // toggle goes into the drop-down list, which Redmine moves into the slide-out menu (the
  // stylesheet shows it only there).
  function insertToggle() {
    if (document.getElementById(BTN_ID)) return;
    var profile = document.querySelector('.top-menu .profile-menu');
    if (profile) profile.insertBefore(createToggle(BTN_ID), profile.firstChild);
    var list = document.querySelector('#account > ul') || document.querySelector('#account .dropdown-content > ul') ||
               document.querySelector('.js-profile-menu > ul');
    if (list) {
      var li = document.createElement('li');
      li.className = 'hanji-theme-toggle-item';
      li.appendChild(createToggle(profile ? null : BTN_ID));
      list.insertBefore(li, list.firstChild);
    }
    apply();
  }

  apply();
  if (media) {
    var onChange = function () { if (!storedMode()) apply(); };
    if (media.addEventListener) media.addEventListener('change', onChange);
    else if (media.addListener) media.addListener(onChange);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', insertToggle);
  else insertToggle();
})();
