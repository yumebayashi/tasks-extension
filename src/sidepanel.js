const openedTime = Date.now();
const { id: windowId } = await chrome.windows.getCurrent();
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'close_sidepanel' && msg.windowId === windowId && Date.now() - openedTime > 50) {
    window.close();
  }
});