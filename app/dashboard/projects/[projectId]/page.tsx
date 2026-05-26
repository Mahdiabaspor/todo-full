
import Draggable from '@/components/draggable';
import Droppable from '@/components/droppable';
import { NewContainerDialog } from '@/components/newContainer-dialog-alert'
import { Button } from '@/components/ui/button'
import { SelectSeparator } from '@/components/ui/select'
import prisma from '@/lib/prisma'
import { DragDropProvider } from '@dnd-kit/react';
import { Folder, FolderArchive, Plus } from 'lucide-react'
import DragDropContainer, { IProject } from './dragDropContainer';

async function page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  if (projectId === undefined) return <div>Project not found</div>

  const project = await prisma.$transaction(async (tx) => {
    const project = await tx.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        members: true,
        containers: {
          include: { tasks: true }
        }
      }
    })
    return project
  })




  return (
    <div className='h-full w-full p-6' >
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold flex items-center justify-start gap-3'>
          <FolderArchive className='size-7!' />
          {project?.name}
        </div>
        <div className=''>
          <NewContainerDialog projectId={projectId}/>


        </div>
      </div>
      <SelectSeparator className='mt-3' />
      <div className='flex items-start gap-5 mt-5 h-full overflow-x-auto'>
        <DragDropContainer project={project as IProject}/>
      </div>

    </div>
  )
}

export default page
