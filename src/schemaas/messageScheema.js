
import { Content } from 'next/font/google'
import { z } from 'zod'

export MessageSchema = z.object({

    Content: z.string()
        .min(10, { message: "Content must be atlease 10 character" })
        .max(300, { message: "Content must be no longer than 300 character" })
})