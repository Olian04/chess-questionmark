import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export const useSearchbar = () => {
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));
  const [href, setHref] = useState(window.location.href);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(format(new Date(), 'HH:mm'));
      setHref(
        window.location.href.length < 40
          ? window.location.href
          : window.location.host
      ),
        5000;
    });
    return () => clearInterval(timer);
  }, []);
  return [time, href];
};
