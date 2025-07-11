const btn = document.getElementById('open');

btn.addEventListener('click', () => {
  if (chrome.commands.openShortcutSettings) {
    chrome.commands.openShortcutSettings();
  } else {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  }
});


