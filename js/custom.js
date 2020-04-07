(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  let timer = document.getElementById("timer");
  let minute = 0;

  function tick() {
    minute++;
    const result = `You are here for ${minute} minute`;

    minute !== 1
      ? (timer.innerHTML = result + "s")
      : (timer.innerHTML = result);
  }

  setInterval(() => tick(), 60000);

  let skipNavLink = document.getElementById("skip-nav-link");
  let currentSkipNavLinkItem = 0;

  function goDown() {
    event.preventDefault();
    if (currentSkipNavLinkItem === 2) {
      return skipNavLink.children[2].setAttribute("tabindex", "0");
    }

    ++currentSkipNavLinkItem;
    skipNavLink.children[currentSkipNavLinkItem].setAttribute("tabindex", "0");
    skipNavLink.children[currentSkipNavLinkItem].focus();
    skipNavLink.children[currentSkipNavLinkItem - 1].setAttribute(
      "tabindex",
      "-1"
    );
  }

  function goUp() {
    event.preventDefault();
    if (currentSkipNavLinkItem === 0) {
      return skipNavLink.children[0].setAttribute("tabindex", "0");
    }

    --currentSkipNavLinkItem;
    skipNavLink.children[currentSkipNavLinkItem].setAttribute("tabindex", "0");
    skipNavLink.children[currentSkipNavLinkItem].focus();
    skipNavLink.children[currentSkipNavLinkItem + 1].setAttribute(
      "tabindex",
      "-1"
    );
  }

  function jumpTo() {
    skipNavLink.children[currentSkipNavLinkItem].children[0].click();
  }

  function keyboardNavigation(e) {
    switch (e.code) {
      case "ArrowUp":
        goUp();
        break;
      case "ArrowDown":
        goDown();
        break;
      case "Enter":
      case "Space":
        jumpTo();
        break;
    }
  }

  skipNavLink.onkeydown = keyboardNavigation;
})();

let tabList = document.querySelector('[role="tablist"]');
let tabPanels = document.querySelectorAll('[role="tabpanel"]');
const tabs = tabList.children;
let currentTab = 0;

function goRight() {
  if (currentTab === 2) {
    currentTab = 0;
    tabs[0].click();
    tabs[0].focus();
  } else {
    currentTab++;
    tabs[currentTab].click();
    tabs[currentTab].focus();
  }
}

function goLeft() {
  event.preventDefault();
  if (currentTab === 0) {
    currentTab = 2;
    tabs[2].click();
    tabs[2].focus();
  } else {
    currentTab--;
    tabs[currentTab].click();
    tabs[currentTab].focus();
  }
}

function activateFirstTab() {
  event.preventDefault();
  currentTab = 0;
  tabs[0].click();
  tabs[0].focus();
}

function activateLastTab() {
  event.preventDefault();
  currentTab = 2;
  tabs[2].click();
  tabs[2].focus();
}

function keyboardNavigation(e) {
  switch (e.code) {
    case "ArrowRight":
      goRight();
      break;
    case "ArrowLeft":
      goLeft();
      break;
    case "Home":
      activateFirstTab();
      break;
    case "End":
      activateLastTab();
      break;
  }
}

tabList.onkeydown = keyboardNavigation;

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute("tabindex", 0);
      navEl.setAttribute("aria-selected", true);
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.removeAttribute("tabindex");
        navEl.setAttribute("aria-selected", false);
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
      tab.removeAttribute("hidden");
    } else {
      tab.style.display = "none";
      tab.setAttribute("hidden", true);
    }
  });
}

(function() {
  let headerMenuButton = document.getElementById("header-menu-button");
  let headerMenu = document.getElementById("header-menu");
  let headerMenuItems = document.querySelectorAll(".header-menu-item");
  let currentItem = 0;

  function openMenu() {
    event.preventDefault();
    headerMenu.style.display = "block";
    headerMenuItems[0].setAttribute("tabindex", 0);
    headerMenuItems[0].focus();
    headerMenuButton.setAttribute("aria-expanded", true);
    headerMenu.setAttribute("hidden", false);
  }

  function closeMenuWithDefaultBehavior() {
    headerMenuButton.setAttribute("aria-expanded", false);
    headerMenu.setAttribute("hidden", true);
    headerMenu.style.display = "none";
    headerMenuItems[currentItem].setAttribute("tabindex", -1);
    currentItem = 0;
    document.querySelectorAll(".navbar-item")[3].focus();
  }

  function closeMenuAndReturnToButton() {
    event.preventDefault();
    headerMenuButton.setAttribute("aria-expanded", false);
    headerMenu.setAttribute("hidden", true);
    headerMenu.style.display = "none";
    headerMenuItems[currentItem].setAttribute("tabindex", -1);
    currentItem = 0;
    headerMenuButton.focus();
  }

  function goToNextMenuItem() {
    event.preventDefault();
    if (currentItem === 4) {
      currentItem = 0;
      headerMenuItems[0].focus();
      headerMenuItems[4].setAttribute("tabindex", -1);
      headerMenuItems[0].setAttribute("tabindex", 0);
    } else {
      currentItem++;
      headerMenuItems[currentItem].focus();
      headerMenuItems[currentItem - 1].setAttribute("tabindex", -1);
      headerMenuItems[currentItem].setAttribute("tabindex", 0);
    }
  }

  function goToPreviousMenuItem() {
    event.preventDefault();
    if (currentItem === 0) {
      currentItem = 4;
      headerMenuItems[4].focus();
      headerMenuItems[0].setAttribute("tabindex", -1);
      headerMenuItems[4].setAttribute("tabindex", 0);
    } else {
      currentItem--;
      headerMenuItems[currentItem].focus();
      headerMenuItems[currentItem + 1].setAttribute("tabindex", -1);
      headerMenuItems[currentItem].setAttribute("tabindex", 0);
    }
  }

  function menuButtonKeyboardClick(e) {
    switch (e.code) {
      case "Enter":
      case "Space":
        openMenu();
        break;
    }
  }

  function chooseMenuItem() {
    event.preventDefault();
    event.stopPropagation();
    let myAlert = document.createElement("p");
    myAlert.setAttribute("role", "alert");
    let myAlertText = document.createTextNode(
      `Yow will be redirected to new tab with ${headerMenuItems[
        currentItem
      ].innerHTML.trim()} quotes in three seconds. Enjoy!`
    );
    myAlert.appendChild(myAlertText);
    document.body.appendChild(myAlert);
    setTimeout(
      (item) =>
        document.open(
          `https://www.brainyquote.com/search_results?q=${item}`,
          "quotes",
          "",
          ""
        ),
      5000,
      [
        headerMenuItems[currentItem].innerHTML
          .trim()
          .toLowerCase()
          .split(" ")
          .join("+"),
      ]
    );
    closeMenuWithDefaultBehavior();
  }

  function headerMenuKeyboardNavigation(e) {
    switch (e.code) {
      case "ArrowDown":
        goToNextMenuItem();
        break;
      case "ArrowUp":
        goToPreviousMenuItem();
        break;
      case "Tab":
        closeMenuWithDefaultBehavior();
        break;
      case "Escape":
        closeMenuAndReturnToButton();
        break;
      case "Enter":
      case "Space":
        chooseMenuItem();
        break;
    }
  }

  headerMenuButton.onkeydown = menuButtonKeyboardClick;
  headerMenu.onkeydown = headerMenuKeyboardNavigation;
})();
