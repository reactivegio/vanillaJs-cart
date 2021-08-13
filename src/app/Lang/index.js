const { DropdownTemplate } = require("../../template/dropdown.template");

const Lang = {};

/**
 * If the detected language is not in the dictionary,
 * the default one will be selected
 *
 * @type {String}
 */

Lang.options = {
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
Lang.set = function (language, dictionary) {
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
};

/**
 * Converts a Language Object to an immediately installed language.
 * If the phrase of the required language is not present, it returns the default language to the target.
 * If not an object is passed, it returns it without transformations.
 * @param  {Object} value Language object or string
 * @return {String}      Set language phrase
 */
Lang.translate = function (value) {
  if (typeof value === "object") {
    return value[this.language] || value[this.options.default];
  } else {
    return value;
  }
};

/**
 * Возвращает фразу по ключу из словаря
 *
 * @param  {String} key Ключ фразы в словаре
 * @return {String}     Фраза из словаря
 */
Lang.get = function (key, dictionary) {
  const currentDictionary = dictionary ? dictionary : this.dictionary;

  if (currentDictionary[key]) {
    return this.translate(currentDictionary[key]);
  } else {
    return "[" + key + "]";
  }
};

Lang.load = function () {
  const container = document.querySelector("#flagsContainer");
  container.innerHTML = DropdownTemplate(
    "langDropdown",
    `<img src='./assets/flags/${this.language}.svg' alt="${this.language}" />`
  );
};

//  CommonJS (CJS) format a way to export module. Another show the es module format
module.exports = { Lang };
