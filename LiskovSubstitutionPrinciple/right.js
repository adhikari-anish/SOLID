// // To fix the issue, we have to change the class that we are inheriting from
// class Shape {
//   area() {
//     // code
//   }
// }

// class Rectangle extends Shape {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   setWidth(width) {
//     this.width = width;
//   }

//   setHeight(height) {
//     this.height = height;
//   }
// }

// class Square extends Shape {
//   setWidth(width) {
//     this.width = width;
//     this.height = width;
//   }

//   setHeight(height) {
//     this.height = height;
//     this.width = height;
//   }
// }

// function increaseRectangleWidth(rectangle) {
//   rectangle.setWidth(rectangle.width + 1);
// }

// const rectangle1 = new Rectangle(10, 2);
// const square = new Square(5, 5);

// increaseRectangleWidth(rectangle1);
// increaseRectangleWidth(square);

// console.log(rectangle1.area());
// console.log(square.area());

class FlyingBird {
  fly() {
    console.log("I can fly");
  }
}

class SwimmingBird {
  fly() {
    console.log("I can fly");
  }
}

class Duck extends FlyingBird {
  quack() {
    console.log("I can quack");
  }
}

class Penguin extends SwimmingBird {
  swim() {
    console.log(" I can swim");
  }
}

function makeFlyingBirdFly(bird) {
  bird.fly();
}

function makeSwimmingBirdSwim(bird) {
  bird.swim();
}

const duck = new Duck();
const penguin = new Penguin();

makeFlyingBirdFly(duck);
makeSwimmingBirdSwim(penguin);
