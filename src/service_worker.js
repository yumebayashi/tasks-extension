chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

const listener = async (cmd, tab) => {
  if (cmd !== 'toggle_sidepanel') return;
  try {
    await chrome.sidePanel.open({ windowId: tab.windowId });
    await chrome.runtime.sendMessage({ type: 'close_sidepanel', windowId: tab.windowId });
  } catch (e) {
    console.log(e);
  }
}

chrome.commands.onCommand.addListener(listener);