class CalorieTracker {
  constructor(maxCalories) {
    this.maxCalories = maxCalories;
    this.currentCalories = 0;
  }

  trackCalories(calorieCount) {
    this.currentCalories += calorieCount;
    if (this.currentCalories > this.maxCalories) {
      logMessage();
    }
  }
}

/**
 * Now since the log message module is outside the class,
 * the CalorieTracker class follows
 * the single responsibility principle */

function logMessage() {
  console.log("Max calories exceeded");
}

const calorieTracekr = new CalorieTracker(2000);
calorieTracekr.trackCalories(500);
calorieTracekr.trackCalories(1000);
calorieTracekr.trackCalories(700);
