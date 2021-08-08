class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let counter = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      counter++;
    }

    return counter;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal <
      vampire.numberOfVampiresFromOriginal
      ? true
      : false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (!name) {
      return null;
    }

    if (this.name === name) {
      return this;
    }

    if (this.offspring.length > 0) {
      for (const vampire of this.offspring) {
        if (vampire.name === name) {
          return vampire;
        }

        if (vampire.offspring.length > 0) {
          const vampireChild = vampire.vampireWithName(name);
          if (vampireChild) {
            return vampireChild;
          }
        }
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    /**
     * DFS Rules
     * 1. Start with any node
     * 2. Check it's child and go every child
     * 3. if it's child have another child keep going depth until no child found
     * 4. then return one step and check if there's child do step 3
     */
    let counter = 0;
    if (this.offspring.length > 0) {
      for (const child of this.offspring) {
        counter++;
        if (child.offspring.length > 0) {
          counter += child.totalDescendents;
        }
      }
    }
    return counter;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
    if (this.offspring.length > 0) {
      for (const child of this.offspring) {
        if (child.yearConverted > 1980) {
          millennials.push(child);
        }

        if (child.offspring.length > 0) {
          millennials.push(...child.allMillennialVampires);
        }
      }
    }
    return millennials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // Num 1
    if (this.creator === null) {
      return this;
    }

    if (this === vampire) {
      // Num 4
      return this;
    }

    if (this.creator === vampire.creator) {
      return this.creator;
    }

    if (this.creator !== vampire.creator) {
      if (this.isMoreSeniorThan(vampire)) {
        if (this.offspring.includes(vampire)) {
          return this;
        }

        return this.creator;
      }

      if (this.creator === vampire) {
        return this.creator;
      }

      return vampire.creator;
    }
  }
}

module.exports = Vampire;
