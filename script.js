document.addEventListener("DOMContentLoaded", function () {
  const characters = document.querySelectorAll(".cell[data-char]");
  const message = document.getElementById("message");
  const actionsDropdown = document.getElementById("actions");
  const moveOption = document.querySelector(".actions ul li:nth-child(1)"); // Select the "Move" option
  const cells = document.querySelectorAll(".cell");
  let selectedCharacter = null; // To keep track of the selected character
  let lastCharacterPosition = null; // To store the last position of the selected character
  let actionsOpen = false; // To keep track of the actions dropdown state

  // Store original positions of characters
  const originalPositions = [];
  characters.forEach((character) => {
    originalPositions.push(Array.from(cells).indexOf(character));
  });

  characters.forEach((character) => {
    // For desktop devices, use click events to select the character and show the actions menu
    character.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click event from propagating to the document

      if (selectedCharacter === this) {
        // Deselect the character if it was already selected
        deselectCharacter();
      } else {
        // Select a new character
        deselectCharacter();
        selectedCharacter = this;
        selectedCharacter.classList.add("selected");
        message.textContent = `Selected Character: ${selectedCharacter.getAttribute(
          "data-char"
        )}`;
        actionsDropdown.style.display = "block";
        actionsOpen = true;
      }
    });

    // For mobile devices, use touch events to select the character and show the actions menu
    character.addEventListener("touchstart", function (event) {
      event.stopPropagation();
      // Select the character on touchstart
      if (selectedCharacter === this) {
        deselectCharacter();
      } else {
        deselectCharacter();
        selectedCharacter = this;
        selectedCharacter.classList.add("selected");
        message.textContent = `Selected Character: ${selectedCharacter.getAttribute(
          "data-char"
        )}`;
        actionsDropdown.style.display = "block";
        actionsOpen = true;
      }
      // Prevent the default touchstart behavior (e.g., scrolling)
      event.preventDefault();
    });
  });

  moveOption.addEventListener("click", function (event) {
    event.stopPropagation();
    // Show the available move cells when "Move" is clicked
    if (selectedCharacter) {
      showAvailableMoveCells(selectedCharacter);
      // Add event listener to each movable cell for moving the character
      cells.forEach((cell) => {
        if (cell.classList.contains("movable")) {
          cell.addEventListener("click", moveCharacter);
        }
      });
    }
  });

  // Function to deselect the currently selected character
  function deselectCharacter() {
    if (selectedCharacter) {
      selectedCharacter.classList.remove("selected");
      selectedCharacter = null;
      message.textContent = "Select a character";
      actionsDropdown.style.display = "none";
      actionsOpen = false;
      removeAvailableMoveCells();
      // Remove event listeners from movable cells
      cells.forEach((cell) => {
        cell.removeEventListener("click", moveCharacter);
      });
    }
  }

  // Function to show available move cells for the selected character
  function showAvailableMoveCells(character) {
    // Reset the background color of all cells
    cells.forEach((cell) => {
      cell.classList.remove("movable");
    });

    // Get the index of the selected character
    const selectedIndex = Array.from(cells).indexOf(character);

    // Highlight the adjacent cells as movable (up, down, left, right)
    const adjacentIndices = [
      selectedIndex - 3,
      selectedIndex + 1,
      selectedIndex + 3,
      selectedIndex - 1,
    ];
    adjacentIndices.forEach((index) => {
      if (index >= 0 && index < cells.length) {
        const cell = cells[index];
        if (!cell.dataset.char) {
          cell.classList.add("movable");
        }
      }
    });
  }

  // Function to remove the available move cells
  function removeAvailableMoveCells() {
    cells.forEach((cell) => {
      cell.classList.remove("movable");
    });
  }

  // Function to move the character to the clicked cell
  function moveCharacter(event) {
    event.stopPropagation();
    if (selectedCharacter && this.classList.contains("movable")) {
      const currentCell = this;
      const currentIndex = Array.from(cells).indexOf(currentCell);
      const characterImg = selectedCharacter.querySelector("img");

      // If the clicked cell contains a character, swap their positions
      if (currentCell.dataset.char) {
        const tempChar = currentCell.querySelector("img");
        currentCell.appendChild(characterImg);
        selectedCharacter.appendChild(tempChar);
      } else {
        currentCell.appendChild(characterImg);
      }

      // Update last position and movable cells after moving
      lastCharacterPosition = Array.from(cells).indexOf(selectedCharacter);
      updateMovableCells(lastCharacterPosition);
      // Deselect the character after moving
      deselectCharacter();
      // Reset movable characters after moving
      resetMovableCharacters();
    }
  }

  // Function to update movable cells after moving a character
  function updateMovableCells(currentIndex) {
    // Reset the background color of all cells
    cells.forEach((cell) => {
      cell.classList.remove("movable");
    });

    // Highlight the adjacent cells as movable (up, down, left, right)
    const adjacentIndices = [
      currentIndex - 3,
      currentIndex + 1,
      currentIndex + 3,
      currentIndex - 1,
    ];
    adjacentIndices.forEach((index) => {
      if (index >= 0 && index < cells.length) {
        const cell = cells[index];
        if (!cell.dataset.char) {
          cell.classList.add("movable");
        }
      }
    });
  }

  // Function to reset movable characters
  function resetMovableCharacters() {
    cells.forEach((cell) => {
      cell.removeEventListener("click", moveCharacter);
    });
    if (selectedCharacter) {
      showAvailableMoveCells(selectedCharacter);
      cells.forEach((cell) => {
        if (cell.classList.contains("movable")) {
          cell.addEventListener("click", moveCharacter);
        }
      });
    }
  }

  // Event listener to handle closing the actions menu when clicking elsewhere
  document.addEventListener("click", function (event) {
    if (!actionsDropdown.contains(event.target) && actionsOpen) {
      deselectCharacter();
    }
  });
});
