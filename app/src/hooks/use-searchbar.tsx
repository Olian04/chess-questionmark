import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export const useSearchbar = () => {
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));
  const [href, setHref] = useState(
    window.location.host + window.location.pathname.split(/(\/.*?)(?:\/|$)/i)[1]
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(format(new Date(), 'HH:mm'));
      setHref(
        window.location.host +
          window.location.pathname.split(/(\/.*?)(?:\/|$)/i)[1]
      );
    }, 500);
    return () => clearInterval(timer);
  }, []);
  return [time, href];
};
