'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import React from 'react';

import { useBlockAnimation } from '../useBlockAnimation';

interface ColorBlocksProps {
  blocks: string[];
  correctIndex: number;
  wrongSelectedIndex: number | undefined;
  showCorrectIndex: number | undefined;
  onBlockClick: (
    index: number,
    correctIndex: number,
    isCorrect: boolean,
  ) => void;
}

export default function ColorBlocks({
  blocks,
  correctIndex,
  wrongSelectedIndex,
  showCorrectIndex,
  onBlockClick,
}: ColorBlocksProps) {
  const newBlockIndexes = useBlockAnimation({ blocks });

  return (
    <div className="grid place-items-center gap-4.5 grid-cols-3">
      {blocks.map((color, index) => {
        const isNew = newBlockIndexes.includes(index);
        const MotionTag = isNew ? motion.button : 'button';

        return (
          <MotionTag
            // eslint-disable-next-line @eslint-react/no-array-index-key
            key={`${color}-${index}`}
            style={{ backgroundColor: color }}
            type="button"
            onClick={() =>
              onBlockClick(index, correctIndex, index === correctIndex)
            }
            className={cn(
              'w-[85px] h-[85px] mobile:w-[100px] mobile:h-[100px] transition-all duration-200 rounded-lg cursor-pointer',
              wrongSelectedIndex === index && 'outline-4 outline-advent-2',
              showCorrectIndex === index && 'outline-4 outline-white/80',
            )}
            {...(isNew && {
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1 },
              transition: {
                duration: 0.3,
                ease: 'linear',
              },
            })}
          />
        );
      })}
    </div>
  );
}
