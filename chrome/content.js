/* global browser */
console.log("SpellTableChromeless looking for play table!");

rootDiv = document.getElementById("root")

let playTableObserver = new MutationObserver(mutations => {
  for(let mutation of mutations) {

    for(let addedNode of mutation.addedNodes) {
      // console.log(addedNode);

      if (addedNode.className === "flex w-full h-full") {
        console.log("Found a play table", addedNode);
        removePlayerBars();
        removeSidebar();
        removeCurrentTurnHighlightOnce();
        playTableObserver.disconnect();
      }
    }
  }
});

playTableObserver.observe(rootDiv, { childList: true, subtree: true });


function removePlayerBars() {
  console.log("Remove all player bars")
  let playerBars = document.getElementsByClassName("absolute inset-x-0 top-0 block z-30")

  Array.from(playerBars).forEach(playerBar => playerBar.remove());
}


function removeSidebar() {
  console.log("Remove the sidebar")

  let sideBars = document.getElementsByClassName("h-full flex flex-col overflow-hidden bg-surface-medium transition-all ease-in-out duration-200 w-drawer-md-full md:w-drawer-lg-full")

  Array.from(sideBars).forEach(sideBar => sideBar.remove());
}

function removeCurrentTurnHighlightOnce() {
  console.log("Remove the current turn highlight once")

  const borderClassName = "border-st-orange-normal";
  let highlightBorder = document.getElementsByClassName(borderClassName);

  Array.from(highlightBorder).forEach(highlight => highlight.classList.remove(borderClassName))
}