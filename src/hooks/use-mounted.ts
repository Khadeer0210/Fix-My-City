
"use client";

import { useState, useEffect } from 'react';

/**
 * A custom hook that returns `true` only after the component has mounted on the client.
 * This is useful for preventing React hydration errors when rendering UI that depends
 * on client-side state or browser-only APIs.
 *
 * @returns {boolean} `true` if the component is mounted, otherwise `false`.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
