"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function createProject(name: string) {

    if (!name || name.trim() === "") {
        throw new Error("Project name cannot be empty")

    }
    const session = await auth()
    const userId = session?.user?.id as string | undefined

    if (!userId) {
        throw new Error("Unauthorized")
    }



    const result = await prisma.$transaction(async (tx) => {

        const project = await tx.project.create({
            data: {
                name: name.trim(),
                ownerId: userId,
            },
        })

        await tx.projectMember.create({
            data: {
                projectId: project.id,
                userId: userId,
                role: "OWNER",
            },
        })




        return project
    })

    revalidatePath("/")
    return result
}