chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});


let openPort = new Map();
chrome.runtime.onConnect.addListener(port => {
  openPort.set(port.name, port);
  console.log(openPort);
  port.onDisconnect.addListener(() => {
    openPort.delete(port.name);
  });
});


async function toggle(windowId) {
  let portName = `sidepanel-${windowId}`;
  if (openPort.has(portName)) {
    openPort.get(portName).postMessage('close');
  } else {
    try {
      await chrome.sidePanel.open({ windowId: windowId });
    } catch (e) {
      console.error(e);
    }
  }
}

chrome.commands.onCommand.addListener((cmd, tab) => {
  if (cmd === 'toggle_sidepanel') {
    toggle(tab.windowId);
  };
});
