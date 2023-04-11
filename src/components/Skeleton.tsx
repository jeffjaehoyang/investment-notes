import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={clsxm(
        'animate-shimmer bg-[#e4e4e4] bg-opacity-100',
        className
      )}
      style={{
        backgroundImage:
          'linear-gradient(to right, #e4e4e4 0%, #d1d1d1 20%, #bdbdbd 40%, #e4e4e4 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
