export default function (store, predicate, selector) {
  let promiseResolver;
  const {getState, subscribe} = store;
  const subscriptionPromise = new Promise(resolve => { promiseResolver = resolve; });

  const unsubscribeFromStore = subscribe(() => {
    const currentState = getState();

    if (predicate(currentState)) {
      promiseResolver(selector(currentState));
    }
  });

  return subscriptionPromise.then(result => {
    unsubscribeFromStore();
    return result;
  });
}
