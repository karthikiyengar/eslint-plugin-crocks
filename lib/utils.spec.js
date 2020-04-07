// @ts-check
const test = require('tape')
const equals = require('crocks/pointfree/equals')
const { Just, Nothing } = require('crocks/Maybe')

const { isCrock, isCrockling, identifyCrock, parseFunctionName } = require('./utils')

test('isCrock', (t) => {
    t.equal(isCrock('crocks'), false)
    t.equal(isCrock('crocks/Sum'), true)
    t.equal(isCrock('crocks/sum'), false)
    t.equal(isCrock('crocks/Maybe'), true)
    t.equal(isCrock('crocks/Either/'), false)
    t.equal(isCrock('crocks/helpers/map'), false)
    t.equal(isCrock('crocks/Pair/fanout'), false)
    t.equal(isCrock('crocks/Maybe/safeLift'), false)
    t.end();
})

test('isCrockling', (t) => {
    t.equal(isCrockling('crocks'), false)
    t.equal(isCrockling('crocks/Sum'), false)
    t.equal(isCrockling('crocks/sum'), false)
    t.equal(isCrockling('crocks/Maybe'), false)
    t.equal(isCrockling('crocks/Either/'), false)
    t.equal(isCrockling('crocks/helpers/map'), false)
    t.equal(isCrockling('crocks/Pair/fanout'), true)
    t.equal(isCrockling('crocks/Maybe/safeLift'), true)
    t.equal(isCrockling('crocks/maybe/safeLift'), false)
    t.end();
})

test('identifyCrock', (t) => {
    t.equal(equals(identifyCrock('crocks'), Nothing()), true);
    t.equal(equals(identifyCrock('crocks/Sum'), Just('crocks')), true);
    t.equal(equals(identifyCrock('crocks/helpers/map'), Just('helpers')), true);
    t.equal(equals(identifyCrock('crocks/weird/stuff'), Nothing()), true);
    t.end();
})

test('parseFunctionName', (t) => {
    t.equal(parseFunctionName('crocks/Sum'), 'Sum')
    t.equal(parseFunctionName('crocks/Maybe'), 'Maybe')
    t.equal(parseFunctionName('crocks/helpers/map'), 'map')
    t.equal(parseFunctionName('crocks/Pair/fanout'), 'fanout')
    t.equal(parseFunctionName('crocks/Maybe/safeLift'), 'safeLift')
    t.end()
})