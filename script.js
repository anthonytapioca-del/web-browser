class WebBrowser {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.addressBar = document.getElementById('addressBar');
        this.backBtn = document.getElementById('backBtn');
        this.forwardBtn = document.getElementById('forwardBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.goBtn = document.getElementById('goBtn');
        this.browserFrame = document.getElementById('browserFrame');
        this.statusBar = document.getElementById('statusBar');
    }

    attachEventListeners() {
        this.goBtn.addEventListener('click', () => this.navigate());
        this.addressBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.navigate();
        });
        this.backBtn.addEventListener('click', () => this.goBack());
        this.forwardBtn.addEventListener('click', () => this.goForward());
        this.refreshBtn.addEventListener('click', () => this.refresh());
        this.browserFrame.addEventListener('load', () => this.onFrameLoad());
    }

    normalizeUrl(url) {
        // If it's a local file or already has protocol, return as-is
        if (url.startsWith('file://') || url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // If it doesn't have a protocol, add https://
        if (!url.includes('://')) {
            return 'https://' + url;
        }
        return url;
    }

    navigate(url) {
        const targetUrl = url || this.addressBar.value.trim();
        if (!targetUrl) return;

        const normalizedUrl = this.normalizeUrl(targetUrl);
        this.updateStatus('Loading...');

        // Add to history
        this.currentIndex++;
        this.history = this.history.slice(0, this.currentIndex);
        this.history.push(normalizedUrl);

        this.addressBar.value = normalizedUrl;
        this.loadUrl(normalizedUrl);
        this.updateNavButtons();
    }

    loadUrl(url) {
        try {
            this.browserFrame.src = url;
        } catch (error) {
            this.updateStatus('Error: ' + error.message);
        }
    }

    goBack() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.addressBar.value = this.history[this.currentIndex];
            this.loadUrl(this.history[this.currentIndex]);
            this.updateNavButtons();
        }
    }

    goForward() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.addressBar.value = this.history[this.currentIndex];
            this.loadUrl(this.history[this.currentIndex]);
            this.updateNavButtons();
        }
    }

    refresh() {
        this.browserFrame.src = this.browserFrame.src;
        this.updateStatus('Refreshing...');
    }

    updateNavButtons() {
        this.backBtn.disabled = this.currentIndex <= 0;
        this.forwardBtn.disabled = this.currentIndex >= this.history.length - 1;
    }

    onFrameLoad() {
        try {
            const title = this.browserFrame.contentDocument?.title || 'Untitled';
            this.updateStatus(`Loaded: ${title}`);
        } catch (error) {
            this.updateStatus('Page loaded');
        }
    }

    updateStatus(message) {
        this.statusBar.textContent = message;
    }
}

// Initialize browser when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WebBrowser();
});
