import { fromPairs } from 'lodash';

export const getViewportInfo = () => {
  const viewport = document.querySelector('meta[name=viewport]');
  if (!viewport || !viewport['content'])
    return { width: window.innerWidth, height: window.innerHeight };

  return fromPairs(
    viewport['content'].split(',').map(content =>
      content
        .trim()
        .split('=')
        .map((data, index) => {
          if (index === 1 && data.match(/\d+/)) return parseFloat(data);
          return data;
        })
    )
  );
};
