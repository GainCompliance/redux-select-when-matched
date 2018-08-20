import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';
import {setStore, subscribe} from '../../src';

suite('subscription', () => {
  test('that the promise is resolved when the predicate returns `true`', async () => {
    const subscribeToStoreChanges = sinon.spy();
    const item = any.simpleObject();
    const getState = sinon.stub();
    getState
      .onFirstCall().returns(any.simpleObject())
      .onSecondCall().returns({...any.simpleObject(), foo: {bar: {baz: item}}});
    setStore({getState, subscribe: subscribeToStoreChanges});
    const stateChangeHandler = subscribeToStoreChanges.getCall(0).args[0];

    const promise = subscribe({
      predicate: state => !!state.foo,
      selector: state => state.foo.bar.baz
    });

    stateChangeHandler();

    stateChangeHandler();

    assert.equal(await promise, item);
  });

  test('that a promise that has been resolved is not checked again for further state updates', async () => {
    const subscribeToStoreChanges = sinon.spy();
    const selector = sinon.spy();
    const getState = sinon.stub();
    getState
      .onFirstCall().returns(any.simpleObject())
      .onSecondCall().returns(any.simpleObject());
    setStore({getState, subscribe: subscribeToStoreChanges});
    const stateChangeHandler = subscribeToStoreChanges.getCall(0).args[0];

    const promise = subscribe({
      predicate: () => true,
      selector
    });

    stateChangeHandler();

    await promise;
    selector.resetHistory();

    stateChangeHandler();

    assert.notCalled(selector);
  });
});
