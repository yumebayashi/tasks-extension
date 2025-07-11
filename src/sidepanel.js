chrome.windows.getCurrent((w) => {
    const portName = `sidepanel-${w.id}`;
    const port = chrome.runtime.connect({ name: portName });
    port.onMessage.addListener(msg => {
        if (msg === 'close') window.close();
    });
});

