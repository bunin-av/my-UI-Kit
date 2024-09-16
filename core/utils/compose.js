export function compose(...callbacks) {
  return function composed(value) {
    if (callbacks.length === 1) return callbacks.pop()(value);
    return composed(callbacks.pop()(value));
  }
}

