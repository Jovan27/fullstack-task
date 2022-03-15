import { useEffect } from 'react';

export const useOnClickAway = (ref: React.RefObject<HTMLElement>, onClickAway: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref && ref.current && !ref.current.contains(e.target as Node)) {
        onClickAway();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
};
