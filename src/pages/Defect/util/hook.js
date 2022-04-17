import { useEffect, useRef } from 'react'

export const useDidUpdate = (cb, deps) => {
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false
    } else {
      cb && cb()
    }
  }, deps);
};
