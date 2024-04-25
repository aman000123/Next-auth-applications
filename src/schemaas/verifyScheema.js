
import { z } from 'zod'

export const VerifyScheema = z.object({
    Code: z.string().length(6, "Verification must be 6 digits")
})