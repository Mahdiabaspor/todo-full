"use client"
import {useDroppable} from '@dnd-kit/react';

function Droppable({id, children}:{id:string, children:React.ReactNode}) {
  const {ref} = useDroppable({
    id,
  });

  return (
    <div className='bg-black/10 w-full h-full flex justify-start items-center flex-col' ref={ref} >
      {children}
    </div>
  );
}


export default Droppable