
import { z } from 'zod'

export const SignInScheema = z.object({

    identifier: z.string(),//identifier reals name hai user name ya email ka
    password: z.string()
})