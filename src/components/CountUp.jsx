import { useInView, animate } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

// Adapted from the React Bits CountUp: same props/API, but driven by a
// fixed-duration eased tween instead of an overdamped spring. On large numbers
// the spring version crawls toward the target for many seconds; the tween lands
// exactly on `to` at delay + duration, so it reads smooth and finishes on time.
export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 1.4,
  className = '',
  startWhen = true,
  separator = '',
  ease = [0.16, 1, 0.3, 1],
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const start = direction === 'down' ? to : from;
  const end = direction === 'down' ? from : to;

  const getDecimalPlaces = num => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) return decimals.length;
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    latest => {
      const hasDecimals = maxDecimals > 0;
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };
      const formatted = Intl.NumberFormat('en-US', options).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator]
  );

  // Show the starting value before the animation runs.
  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(start);
  }, [formatValue, start]);

  useEffect(() => {
    if (!isInView || !startWhen) return;
    if (typeof onStart === 'function') onStart();

    const controls = animate(start, end, {
      duration,
      delay,
      ease, // overridable per instance (e.g. 'linear' so all counters land together)
      onUpdate: latest => {
        if (ref.current) ref.current.textContent = formatValue(latest);
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = formatValue(end);
        if (typeof onEnd === 'function') onEnd();
      }
    });

    return () => controls.stop();
  }, [isInView, startWhen, start, end, duration, delay, formatValue, onStart, onEnd]);

  return <span className={className} ref={ref} />;
}
