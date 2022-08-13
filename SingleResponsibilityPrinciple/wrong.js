class CalorieTracker {
  constructor(maxCalories) {
    this.maxCalories = maxCalories;
    this.currentCalories = 0;
  }

  trackCalories(calorieCount) {
    this.currentCalories += calorieCount;
    if (this.currentCalories > this.maxCalories) {
      this.logCaloriesSurplus();
    }
  }

  /**
   *  This method should not be here
   *  since this violates single responsibility principel.
   *  There shouldn't be more than one reason for class to change. */

  logCaloriesSurplus() {
    console.log("Max calories exceeded");
  }
}

const calorieTracekr = new CalorieTracker(2000);
calorieTracekr.trackCalories(500);
calorieTracekr.trackCalories(1000);
calorieTracekr.trackCalories(700);
