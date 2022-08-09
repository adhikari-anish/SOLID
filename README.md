# S.O.L.I.D
## The first 5 principles of Object Oriented Design with Javascript

Notes on Solid priciple based on the article: 
https://medium.com/@cramirez92/s-o-l-i-d-the-first-5-priciples-of-object-oriented-design-with-javascript-790f6ac9b9fa

https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design


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

