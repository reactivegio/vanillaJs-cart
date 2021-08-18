const { DropdownTemplate } = require("../template/dropdown.template");

class Lang {
  constructor() {
    this.options = {
      default: "en",
      languages: [
        {
          small_title: "en",
          long_title: "English",
        },
        {
          small_title: "fr",
          long_title: "Français",
        },
        {
          small_title: "it",
          long_title: "Italiano",
        },
        {
          small_title: "ru",
          long_title: "русский",
        },
        {
          small_title: "zh",
          long_title: "中国人",
        },
      ],
    };
  }

  /**
   * Returns a phrase using a dictionary key
   * @param  {String} key Key phrase in dictionary
   * @return {String}     Dictionary phrase
   */
  get(key, dictionary) {
    const currentDictionary = dictionary ? dictionary : this.dictionary;

    if (currentDictionary[key]) {
      return this.translate(currentDictionary[key]);
    } else {
      return "[" + key + "]";
    }
  }

  load() {
    const container = document.querySelector("#flagsContainer");
    container.innerHTML = DropdownTemplate(
      "langDropdown",
      `<img src='./assets/flags/${this.language}.svg' alt="${this.language}" />`
    );
  }
  /**
   * Sets the language to the one specified in the first parameter,
   * or from the <html lang> tag,
   * or navigator.language
   * or navigator.userLanguage (EI)
   *
   * @param {String} language ISO 639-1
   * @param {String} dictionary
   * @return {String} Returns the ISO 639-1 code of the installed language
   */
  set(language, dictionary) {
    this.language = (
      language ||
      document.documentElement.lang ||
      navigator.language ||
      navigator.userLanguage ||
      this.options.default
    ).split("-")[0];

    if (dictionary) {
      this.dictionary = dictionary;
    }

    return this.language;
  }

  /**
   * Converts a Language Object to an immediately installed language.
   * If the phrase of the required language is not present, it returns the default language to the target.
   * If not an object is passed, it returns it without transformations.
   * @param  {Object} value Language object or string
   * @return {String}      Set language phrase
   */
  translate(value) {
    if (typeof value === "object") {
      return value[this.language] || value[this.options.default];
    } else {
      return value;
    }
  }
}

const SiteLang = new Lang();
export default SiteLang;
