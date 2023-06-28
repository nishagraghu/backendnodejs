
// const  test = require('./add');
// const { demo } = require('./demo');
const assert = require('chai').assert;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const proxyquire = require('proxyquire');

const addStub = sinon.stub().returns(5);

const demo = proxyquire('./demo', {
  './add': { Add: addStub },
}).demo;

describe('demo', function() {
  it('should call the add function with 1 and 3 and return the sum', function() {
    const result = demo();
    assert.equal(result, 5);
 
  });
});