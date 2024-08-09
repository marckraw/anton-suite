export const prop = (k) => (o) => o[k];
export const pipe = (...fns) => (x) => [...fns].reduce((acc, f) => f(acc), x);