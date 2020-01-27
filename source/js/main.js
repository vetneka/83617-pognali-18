"use strict";

var mainHeader = document.querySelector(".main-header");
var mainLogo = document.querySelector(".main-logo");
var hamburger = document.querySelector(".hamburger");

var countriesFilter = document.querySelector(".countries-filter");
var countriesFilterButtonOutside = document.querySelector(".countries-filter__button-outside");
var countriesFilterButtonInside = document.querySelector(".countries-filter__button-inside");

var companionsForm = document.querySelector(".companions-form");
var companionsFormFieldset = document.querySelectorAll(".companions-form__fieldset");
var companionsFormLegend = document.querySelectorAll(".companions-form__legend");

var modalTariffs = document.querySelector(".modal--tariffs");
var modalButton = document.querySelector(".modal__button");
var tariffsLink = document.querySelector(".tariffs__link");

mainHeader.classList.remove("main-header--no-js");
mainLogo.classList.remove("main-logo--no-js");

hamburger.addEventListener("click", function () {
  mainHeader.classList.toggle("main-header--opened");
  mainLogo.classList.toggle("main-logo--opened");
  hamburger.classList.toggle("hamburger--opened");
});

window.addEventListener("scroll", function () {
  var pageYOffset = window.pageYOffset;

  if (pageYOffset) {
    mainHeader.classList.add("main-header--scroll");
    mainLogo.classList.add("main-logo--opened");
    hamburger.classList.add("hamburger--scroll");

  } else {
    mainHeader.classList.remove("main-header--scroll");
    mainLogo.classList.remove("main-logo--opened");
    hamburger.classList.remove("hamburger--scroll");
  }

  /* if (pageYOffset === 0) {
    hamburger.addEventListener("click", function () {
      mainLogo.classList.toggle("main-logo--opened");
    });
  } */
});

if (countriesFilter || countriesFilterButtonOutside || countriesFilterButtonInside) {
  countriesFilter.classList.remove("countries-filter--no-js");

  countriesFilterButtonOutside.addEventListener("click", function (evt) {
    evt.preventDefault();
    countriesFilter.classList.toggle("countries-filter--close");
  });

  countriesFilterButtonInside.addEventListener("click", function (evt) {
    evt.preventDefault();
    countriesFilter.classList.toggle("countries-filter--close");
  });
};

if (companionsForm) {
  companionsForm.classList.remove("companions-form--no-js");

  for (var i = 0; i < companionsFormLegend.length; i++) {
    (function (i) {
      companionsFormFieldset[i].classList.remove("companions-form__fieldset--open");
      companionsFormLegend[i].addEventListener("click", function(evt) {
        evt.preventDefault();
        companionsFormFieldset[i].classList.toggle("companions-form__fieldset--opened");
        companionsFormFieldset[i].classList.toggle("companions-form__fieldset--open");
      })
    })(i);
  }
};

if (modalTariffs || tariffsLink) {
  tariffsLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    modalTariffs.classList.add("modal--show");
  });

  modalButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    modalTariffs.classList.remove("modal--show");
  })
};

(function () {
  if("svg4everybody" in window) {
    svg4everybody();
  }
})();