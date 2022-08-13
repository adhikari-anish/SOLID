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
