import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';
import selectWhenMatched from '../../src';

function simulateStateChange(store) {
  store.subscribe.getCall(0).args[0]();
}

suite('select-when-matched', () => {
  let subscribeToStoreChanges, unsubscribeFromStore, getState, store;
  const item = any.simpleObject();

  setup(() => {
    subscribeToStoreChanges = sinon.stub();
    unsubscribeFromStore = sinon.spy();
    getState = sinon.stub();
    store = {getState, subscribe: subscribeToStoreChanges};
  });

  test('that the promise is resolved when the predicate returns `true`', async () => {
    const predicate = state => !!state.foo;
    const selector = state => state.foo.bar.baz;
    subscribeToStoreChanges.returns(unsubscribeFromStore);
    getState
      .onFirstCall().returns(any.simpleObject())
      .onSecondCall().returns({...any.simpleObject(), foo: {bar: {baz: item}}});

    const resultPromise = selectWhenMatched(store, predicate, selector);
    assert.calledOnce(subscribeToStoreChanges);

    simulateStateChange(store);
    assert.calledOnce(getState);

    simulateStateChange(store);
    assert.equal(await resultPromise, item);
  });

  test('that when the promise is resolve the subscription is unsubscribed', async () => {
    const predicate = () => true;
    const selector = () => undefined;
    subscribeToStoreChanges.returns(unsubscribeFromStore);

    const resultPromise = selectWhenMatched(store, predicate, selector);
    simulateStateChange(store);
    await resultPromise;

    assert.calledOnce(unsubscribeFromStore);
  });
});
