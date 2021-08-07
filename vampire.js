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
        console.log("Inner==========");
        let currentVampire = this;
        while (currentVampire) {
          if (!currentVampire.creator) {
            return currentVampire;
          }
          currentVampire = currentVampire.creator;
        }
        return currentVampire.creator;
        console.log("Inner++++++++++");
        return this.creator;
      }

      if (this.creator === vampire) {
        return this.creator;
      }
      console.log("==========");
      let currentVampire = this;
      while (currentVampire) {
        if (!currentVampire.creator) {
          return currentVampire;
        }
        currentVampire = currentVampire.creator;
      }
      return currentVampire.creator;

      console.log("++++++++++");

      return vampire.creator;
    }
  }
}

module.exports = Vampire;
