// class Rectangle {
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

//   area() {
//     return this.width * this.height;
//   }
// }

// class Square extends Rectangle {
//   setWidth(width) {
//     this.width = width;
//     this.height = width;
//   }

//   setHeight(height) {
//     this.height = height;
//     this.width = height;
//   }
// }

// /**
//  * here the square class (subclass) cannot substitue the
//  * rectangle class (base class)
//  * because when we increase square width
//  * both the width and height gets increased
//  * and the result is another square instead of rectangle
//  * so this funciton increaseRectangleWidth violates Liskov substitution principle.
//  */

// function increaseRectangleWidth(rectangle) {
//   rectangle.setWidth(rectangle.width + 1);
// }

// const rectangle1 = new Rectangle(10, 2);
// const square = new Square(5, 5);

// increaseRectangleWidth(rectangle1);
// increaseRectangleWidth(square);

// console.log(rectangle1.area());
// console.log(square.area());

class Bird {
  fly() {
    console.log("I can fly");
  }
}

class Duck extends Bird {
  quack() {
    console.log("I can quack");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Cannot fly");
  }

  swim() {
    console.log(" I can swim");
  }
}

function makeBirdFly(bird) {
  bird.fly();
}

const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck);
makeBirdFly(penguin);
