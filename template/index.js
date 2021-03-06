
(function () {
  // Template Class that contains the core algorithm
  class Autocomplete {
    constructor() {
      this.timeout = null;
    }

    clearPreviousRequests() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }

    search(searchTerm) {
      return new Promise((resolve, reject) => {
        this.clearPreviousRequests();
        this.timeout = setTimeout(() => {
          this.request(searchTerm).then(resolve).catch(reject);
        }, 300);
      });
    }
  }

  // Derived class that has specific implementation
  class ItunesAutocomplete extends Autocomplete {
    request(searchTerm) {

      return new Promise((resolve, reject) => {
        window.__resolve = resolve;
        var script = document.createElement('script');
        script.src = `https://itunes.apple.com/search?term=${searchTerm}&callback=__resolve`

        document.getElementsByTagName('head')[0].appendChild(script);
      });
    }
  }

  // Another derivation. Could be something completely different
  class FacebookAutocomplete extends Autocomplete {
    request(searchTerm) {

      return new Promise((resolve, reject) => {
        window.__resolve = resolve;
        var script = document.createElement('script');
        script.src = `https://graph.facebook.com/${searchTerm}&callback=__resolve`

        document.getElementsByTagName('head')[0].appendChild(script);
      });
    }
  }

  // Debounce on keyup
  let itunesAutocomplete = new ItunesAutocomplete();
  const searchBox = document.getElementById('search-box');
  searchBox.addEventListener('keyup', function () {
    itunesAutocomplete.search(searchBox.value).then(console.log);
  });
}())