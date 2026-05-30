"use server"

import { prisma } from "@/lib/prisma"
import { sessionCheck } from "./session-cheker"

export async function findUserByEmail(email: string) {
    if (email.trim() === "") return null
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    console.log("Found user:", user)
    return user?.id ? user : null
}


interface inviteProps {
    userId: string;
    projectId: string;
    invitedById: string
}
export async function InviteUser(data: inviteProps) {
    await sessionCheck()
    if (!data.invitedById) return

    const inviteExist = await prisma.invitations.findFirst({
        where: {

            projectId: data.projectId,
            userId: data.userId,
            invitedById: data.invitedById

        }

    })
    if(inviteExist){
        throw new Error("this user is already Invited")
    }
    const invite = await prisma.invitations.create({
        data: {
            invitedById: data.invitedById,
            projectId: data.projectId,
            userId: data.userId
        }
    })

    return invite
}
