const fs = require("fs")
const path = require("path")
// theoretically hot-swap the JSON file with a database
const PRODUCTS_INFO = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./products.json"))
)

class CheckOut {
  constructor(rule) {
    this.rule = rule
    this.items = {}
    this.gifts = {}
  }
  /**
   * apply special price policy to the scanned items
   * @param  {string} itemName
   */
  _modifyWithRule(itemName) {
    if (this.rule[itemName] === undefined) return
    const currentAmount = this.items[itemName].amount
    const { isBundle, number, giftItem, giftAmount, priceChangeTo } = this.rule[
      itemName
    ]
    // scanned items amount is bigger than policy applied amount
    if (currentAmount >= number) {
      if (!isBundle) {
        // no-bundle policy products, drop down price only
        this.items[itemName].price = priceChangeTo
      } else {
        // bundle policy product,
        const bundleTimes = Math.floor(currentAmount / number)
				const chargeItemAmount = this.items[itemName].amount - bundleTimes
        if (bundleTimes >= 1) {
          if (giftItem === '') {
            // the gist item is itself, like atv
            this.items[itemName].amount = chargeItemAmount
            this.gifts[itemName] = { amount: bundleTimes }
          } else {
            //the gift item is others, like mbp
            this.gifts[giftItem] = { amount: giftAmount }
          }
        }
      }
    }
  }

  scanItem(itemName = '') {
		if(PRODUCTS_INFO[itemName] === undefined) throw new Error('wrong item name')
    if (this.items[itemName] === undefined) {
      this.items[itemName] = { amount: 1, price: PRODUCTS_INFO[itemName].price }
    } else {
      this.items[itemName].amount += 1
    }
  }
  totalPrice() {
    let sum = 0.0
    for (const i in this.items) {
			const ele = this.items[i]
			this._modifyWithRule(i)
      sum += ele.amount * ele.price
    }
    return { itm: this.items, gft: this.gifts, sum: sum }
  }
}

module.exports = CheckOut
