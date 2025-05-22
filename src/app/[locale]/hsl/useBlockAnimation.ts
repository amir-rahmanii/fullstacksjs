import { range } from '@fullstacksjs/toolbox';
import { useEffect, useRef, useState } from 'react';

interface UseBlockAnimationProps {
  blocks: string[];
}

export function useBlockAnimation({ blocks }: UseBlockAnimationProps) {
  const prevLengthRef = useRef(blocks.length);
  const [newBlockIndexes, setNewBlockIndexes] = useState<number[]>([]);

  useEffect(() => {
    const prevLength = prevLengthRef.current;
    const currLength = blocks.length;

    if (currLength > prevLength) {
      const newIndexes = range(currLength - prevLength).map(
        (_, i) => prevLength + i,
      );
      setNewBlockIndexes(newIndexes);
    } else {
      setNewBlockIndexes([]);
    }

    prevLengthRef.current = currLength;
  }, [blocks]);

  return newBlockIndexes;
}
