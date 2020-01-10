const clientMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }
  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  // 返回Promise
  return new Promise(resolve => {
    promise
      .then(json => {
        if (json instanceof Array) {
          const pass = json.every(jsonChild => jsonChild.errorNum === 0);
          if (pass) {
            next({ ...rest, result: json, type: SUCCESS });
          } else {
            next({ ...rest, error: json, type: FAILURE });
          }
        } else if (json.errorNum === 0 || json.graphql) {
          next({ ...rest, result: json, type: SUCCESS });
        } else {
          next({ ...rest, error: json, type: FAILURE });
        }
        resolve(json);
      })
      .catch(err => {
        next({ ...rest, error: err, type: FAILURE });
        resolve();
      });
  });
};
export default clientMiddleware;