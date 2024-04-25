
import { z } from 'zod'

export constSignInScheema = z.object({

    identifier: z.string(),//identifier reals name hai user name ya email ka
    password: z.string()
})