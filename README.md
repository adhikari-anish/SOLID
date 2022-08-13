# S.O.L.I.D
## The first 5 principles of Object Oriented Design with Javascript

Notes on Solid priciple based on the article: 
https://medium.com/@cramirez92/s-o-l-i-d-the-first-5-priciples-of-object-oriented-design-with-javascript-790f6ac9b9fa

and Web Dev Simplified Videos:
https://www.youtube.com/playlist?list=PLZlA0Gpn_vH9kocFX7R7BAe_CvvOCO_p9


## Single responsibility principle

> A class should have one and only one reason to change, meaning that a class should only have one job.

```js
const circle = (radius) => {
  const proto = {
    type: "Circle",
    // code
  };
  return Object.assign(Object.create(proto), { radius });
};
```

```js
const square = (length) => {
  const proto = {
    type: "Square",
    //code
  };
  return Object.assign(Object.create(proto), { length });
};
```
 
```js
const areaCalculator = (s) => {
  const proto = {
    sum() {
      // logic to sum
    },
    output() {
      return `
        <h1>
          Sum of the areas of provided shapes: ${this.sum()}
        </h1>
      `;
    },
  };
  return Object.assign(Object.create(proto), { shapes: s });
};

const shapes = [
  circle(2),
  square(5),
  square(6)
]

const areas = areaCalculator(shapes);
```

 Here areaCalculator factory function should only sum the areas of the provided shape, it should not care whether the user wants JSON or HTML.

To fix the above issue, we can create an SumCalculatorOutputter factory functionand handle the logic on how summed areas of provided shapes are displayed.

```js
const shapes = [
  circle(2),
  square(5),
  square(6)
]
const areas  = areaCalculator(shapes)
const output = sumCalculatorOputter(areas)
console.log(output.JSON())
console.log(output.HAML())
console.log(output.HTML())
console.log(output.JADE())
```

<hr />

## Open-closed Principle

> Objects or entities should be open for extension, but closed for modification.

Open for extension means that we should be able to add new features or components to the application without breaking existing code.

Closed for modification means that we should not introduce breaking changes to existing functionality, because that would force you to refactor a lot of existing code. - Eric Elliott

Let's say we have the following code:

```js
function printQuiz(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    switch (question.type) {
      case "boolean":
        console.log("1. True");
        console.log("2. False");
        break;
      case "multipleChoice":
        question.options.forEach((option, index) => {
          console.log(`${index + 1}. ${option}`);
        });
        break;
      case "text":
        console.log("Answer: _________________");
        break;
    }
    console.log(" ");
  });
}

const questions = [
  {
    type: "boolean",
    description: "This video is useful.",
  },
  {
    type: "multipleChoice",
    description: "What is your favorite language?",
    options: ["CSS", "HTML", "JS", "Python"],
  },
  {
    type: "text",
    description: "Describe your favorite JS feature.",
  },
];

printQuiz(questions);
```

Now we have to introduce range type question to the questions array.

```js
function printQuiz(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    switch (question.type) {
      case "boolean":
        console.log("1. True");
        console.log("2. False");
        break;
      case "multipleChoice":
        question.options.forEach((option, index) => {
          console.log(`${index + 1}. ${option}`);
        });
        break;
      case "text":
        console.log("Answer: _________________");
        break;
      case "range":
        console.log("Minimum: ________________");
        console.log("Maximum: ________________");
        break;
    }
    console.log(" ");
  });
}

const questions = [
  {
    type: "boolean",
    description: "This video is useful.",
  },
  {
    type: "multipleChoice",
    description: "What is your favorite language?",
    options: ["CSS", "HTML", "JS", "Python"],
  },
  {
    type: "text",
    description: "Describe your favorite JS feature.",
  },
  {
    type: "range",
    description: "What is the speed limit in your city?",
  },
];

printQuiz(questions);
```

 The above chagnes violates open/closed principle because we have to make changes to the printQuiz function which is bad practice. When we are changing the code outside (outside of printQuiz function here) we should never change the code inside (inside of printQuiz function). The printQuiz should automatically adapt to the changes of the outside.

 In order to make the above code follow the open-closed principle, we separated out each question type to their own classes and passed the instances of the question classes to the printQuiz class. In this way, we don't have to make changes to the printQuiz function when new question type is introduced. The printQuiz function is open for extensibility but closed for modifications.

 ```js
 class BooleanQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("1. True");
    console.log("2. False");
  }
}

class MultipleChoiceQuestion {
  constructor(description, options) {
    this.description = description;
    this.options = options;
  }

  printQuestionChoices() {
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }
}

class TextQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Answer: _________________");
  }
}

class RangeQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Minimum: ________________");
    console.log("Maximum: ________________");
  }
}

function printQuiz(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    question.printQuestionChoices();
    console.log("");
  });
}

const questions = [
  new BooleanQuestion("This video is useful."),
  new MultipleChoiceQuestion("What is your favorite language?", [
    "CSS",
    "HTML",
    "JS",
    "Python",
  ]),
  new TextQuestion("Describe your favorite JS feature."),
  new RangeQuestion("What is the speed limit in your city?"),
];

printQuiz(questions);
```

<hr />

## Liskov Substitution principle

> Let q(x) be a property provable about objects of x of type T. Then q(y) should be provable for objects y of type S where S is a subtype of T.

All this is stating is that every subclass/derived class should be substitutable for their base/parent class.

In other words, as simple as that, a subclass should override the parent class methods in a way that does not break functionality from a client's point of view.

Let's conside the following code: 

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.height = height;
    this.width = height;
  }
}

function increaseRectangleWidth(rectangle) {
  rectangle.setWidth(rectangle.width + 1);
}

const rectangle1 = new Rectangle(10, 2);
const square = new Square(5, 5);

increaseRectangleWidth(rectangle1);
increaseRectangleWidth(square);

console.log(rectangle1.area());
console.log(square.area());
```
 
 Here the square class (subclass) cannot substitue the  rectangle class (base class) because when we increase square width both the width and height gets increased and the result is another square instead of rectangle so the funciton increaseRectangleWidth violates Liskov substitution principle.

To fix the issue, we have to change the class that we are inheriting from.

```javascript
// To fix the issue, we have to change the class that we are inheriting from
class Shape {
  area() {
    // code
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }
}

class Square extends Shape {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.height = height;
    this.width = height;
  }
}

function increaseRectangleWidth(rectangle) {
  rectangle.setWidth(rectangle.width + 1);
}

const rectangle1 = new Rectangle(10, 2);
const square = new Square(5, 5);

increaseRectangleWidth(rectangle1);
increaseRectangleWidth(square);

console.log(rectangle1.area());
console.log(square.area());

```

Let take another example: 

```js
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
```

The above code violates the Liskov substitution principle. The makeBirdFly must work for every sub class of bird class. But the penguin sub class throws error because it throws error when fly method is called. So penguin sub class fails Liskov substitution principle.

To solve the above issue we split the base `Bird` class into `FlyingBird` class and `SwimmingBird` class as follows:

```js
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
```

Now a/c to Liskov Substitution Principle, if we have a function that accepts a class then every subclass that inherits that class must be able to enter that function and work properly. In the above code, both Duck and Penguin class is valid for makeFlyingBirdFly function and makeSwimmingBirdSwim function. 

If we need swimming functionality to our Duck, we need another parent class which has both method. And, this becomes difficult in complex inheritance trees. That's where `composition` enters into. Composition is about adding functionality insted of inheriting functionality. We would add flying functionality to the Duck and swimming functionality to the Duck without extending any base classes.

<hr />

## Interface segregation principle

> A client should never be forced to implement an interface that it doesn't use or clients shouldn't be forced to depend on methods they do no use.

```js
class Entity {
  constructor(name, attackDamage, health) {
    this.name = name;
    this.attackDamage = attackDamage;
    this.health = health;
  }

  move() {
    console.log(`${this.name} moved`);
  }

  attack(targetEntity) {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`
    );
    targetEntity.takeDamage(this.attackDamage);
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }
}

class Character extends Entity {}

class Wall extends Entity {
  constructor(name, health) {
    super(name, 0, health);
  }

  move() {
    return null;
  }

  attack() {
    return null;
  }
}

class Turret extends Entity {
  constructor(name, attackDamage) {
    super(name, attackDamage, -1);
  }

  move() {
    return null;
  }

  takeDamage() {
    return null;
  }
}

const turret = new Turret("Turret", 5);
const character = new Character("Character", 3, 100);
const wall = new Wall("Wall", 200);
```

The problem with above code is that our base class has too many method that is not being used by child classes. And, this is the same problem with Interface Segregation Principle but here it is with class. 

The solution to the above problem is to break interface into multiple but here it is with class. We have to break the base class into multiple components. 

```js
class Entity {
  constructor(name) {
    this.name = name;
  }
}

const mover = {
  move() {
    console.log(`${this.name} moved`);
  },
};

const attacker = {
  attack(targetEntity) {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`
    );
    targetEntity.takeDamage(this.attackDamage);
  },
};

const hasHealth = {
  takeDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  },
};

class Character extends Entity {
  constructor(name, attackDamage, health) {
    super(name);
    this.attackDamage = attackDamage;
    this.health = health;
  }
}

Object.assign(Character.prototype, mover);
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);

class Wall extends Entity {
  constructor(name, health) {
    super(name);
    this.health = health;
  }
}

Object.assign(Wall.prototype, hasHealth);

class Turret extends Entity {
  constructor(name, attackDamage) {
    super(name);
    this.attackDamage = attackDamage;
  }
}

Object.assign(Turret.prototype, attacker);

const turret = new Turret("Turret", 5);
const character = new Character("Character", 3, 100);
const wall = new Wall("Wall", 200);

turret.attack(character);
character.move();
character.attack(wall);
```

Now, we have the refactored code with the child classes only having the methods that it needs and hence, this satisfies the interface segregatoin principle with the interface refering to the base class.

<hr />

## Dependency Inversion Principle

> Entities must depend on abstractions not on concretions. It states that the high level module must not depend on the low level module, but they should depend on abstractions.

Lets say we have a following code: 

```javascript
class Store {
  constructor(user) {
    this.stripe = new Stripe(user);
  }

  purchaseBike(quantity) {
    this.stripe.makePayment(200 * quantity * 100); // since stipe always takes amount in pennies
  }

  purchaseHelment(quantity) {
    this.stripe.makePayment(15 * quantity * 100);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} with Stripe`
    );
  }
}

class Paypal {
  makePayment(user, amountInDollars) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store("Anish");
store.purchaseBike(2);
store.purchaseHelment(2);
```

Here initially we use stripe as a payment API but after sometimes stripe changed its pricing and it becomes expensive to use. So we thought to change payment api from stripe to paypal.

So, in order to switch to Paypal we have made following changes to the code: 

```js
class Store {
  constructor(user) {
    this.user = user;
    this.paypal = new Paypal();
  }

  purchaseBike(quantity) {
    this.paypal.makePayment(this.user, 200 * quantity * 100); // since stipe always takes amount in pennies
  }

  purchaseHelment(quantity) {
    this.paypal.makePayment(this.user, 15 * quantity * 100);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} with Stripe`
    );
  }
}

class Paypal {
  makePayment(user, amountInDollars) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store("Anish");
store.purchaseBike(2);
store.purchaseHelment(2);
```

These changes were so cumbersome to make. In real app, it becomes more painful to make changes, we have to make changes in lot of place.

So, in order to overcome these difficulties we want to make a intermediate API which is going to be a wrapper which wraps stripe api and paypal api. This wrapper api has exact same method so, we dont have to make changes to Store class when we transition from one api to another.

```js
class Store {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  purchaseBike(quantity) {
    this.paymentProcessor.pay(200 * quantity);
  }

  purchaseHelment(quantity) {
    this.paymentProcessor.pay(15 * quantity);
  }
}

class StripePaymentProcessor {
  constructor(user) {
    this.stripe = new Stripe(user);
  }

  pay(amountInDollars) {
    this.stripe.makePayment(amountInDollars * 100);
  }
}

class PaypalPaymentProcessor {
  constructor(user) {
    this.user = user;
    this.paypal = new Paypal();
  }

  pay(amountInDollars) {
    this.paypal.makePayment(this.user, amountInDollars);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} with Stripe`
    );
  }
}

class Paypal {
  makePayment(user, amountInDollars) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store(new PaypalPaymentProcessor("Anish"));
store.purchaseBike(2);
store.purchaseHelment(2);

```
Here `StripePaymentProcessor` and `PaypalPaymentProcessor` are wrapper around stripe and paypal api.