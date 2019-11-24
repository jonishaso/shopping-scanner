const { expect } = require('chai')
const CheckOut = require('../checkOut')
const fs = require('fs')
const path = require('path')
let co = null
const prodList1 = ['atv', 'atv', 'atv','atv', 'atv', 'vga', 'mbp', 'mbp']
const prodList2 = ['atv', 'atv', 'atv','atv', 'ipd', 'ipd','ipd','ipd','ipd','vga', 'mbp', 'mbp']
const prodListWithWrong = ['atv', 'atv', 'atv', 'adfasdf','atv', 'atv', 'vga', 'mbp', 'mbp']
describe('test CheckOut Class', () => {
  before(done => {
    fs.readFile(path.join(__dirname, '../specials.json'), 'utf8', function(
      err,
      fileContents
    ) {
      if (err) throw err
      let rules = JSON.parse(fileContents)
      co = new CheckOut(rules)
      done()
    })
  })

  it('list first', () => {
    try {
      for (const e of prodList1) {
        co.scanItem(e)
      }
      const result = co.totalPrice()
      expect(result.sum).to.equal(3267.98)
    } catch (error) {
      expect(() => new error()).to.throw()
    }
  })
  it('list second', () => {
    try {
      for (const e of prodList2) {
        co.scanItem(e)
      }
      const result = co.totalPrice()
      expect(result.sum).to.equal(5658.43)
    } catch (error) {
      expect(() => new error()).to.throw()
    }
  })
  it('list error', () => {
    try {
      for (const e of prodListWithWrong) {
        co.scanItem(e)
      }
      co.totalPrice()
    } catch (error) {
      expect(() => new error()).to.throw()
    }
  })


})
