// tslint:disable:no-expression-statement
import test from 'ava'
import { getBpValue, bpDefaults } from './core'

test('Check that getBpValue returns the expected value', t => {
  t.is(getBpValue(0, bpDefaults), 0)
  t.is(getBpValue(10, bpDefaults), 10)
  t.is(getBpValue(null, bpDefaults), -1)
  t.is(getBpValue('m', bpDefaults), bpDefaults['m'])
})
