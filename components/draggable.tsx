"use client"
import {useDraggable} from '@dnd-kit/react';
import React from 'react';

// Draggable.tsx
function Draggable({children, data, id}: {children: React.ReactNode, data?: any, id: string}) {
  const {ref} = useDraggable({
    id: id, // آیدی منحصربه‌فرد برای dnd-kit
    data: data,
  });

  return (

    <div className='w-full flex items-center justify-center' ref={ref}>
      {children}
    </div>
  );
}

export default Draggable;