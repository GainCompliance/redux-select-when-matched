let store;
let subscriptions = [];

export function subscribe(subscription) {
  let promiseResolver;
  const promise = new Promise(resolve => {
    promiseResolver = resolve;
  });

  subscriptions = [
    ...subscriptions, {
      ...subscription,
      resolve: promiseResolver
    }
  ];

  return promise;
}

export function setStore(s) {
  store = s;

  store.subscribe(() => {
    const newState = store.getState();

    subscriptions = subscriptions
      .map(subscription => {
        if (subscription.predicate(newState)) {
          subscription.resolve(subscription.selector(newState));

          return null;
        }

        return subscription;
      })
      .filter(Boolean);
  });
}
