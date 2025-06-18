/*store and retrieve recent using localStorage*/

const STORAGE_KEY = 'weatherSearchHistory';

export function saveSearch(query) {
    let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Remove duplicates
    history = history.filter(item => item !== query);

    // Add to top
    history.unshift(query);

    // Limit to 3
    if (history.length > 3) {
        history = history.slice(0, 3);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getSearchHistory() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}