// src/lib/payload.ts
import configPromise from '@payload-config'

import { getPayload } from "payload";

 export const payload = await getPayload({
      config: configPromise,
    })
    // this is a usable code used for initialization of payload any time you fetch using this you need ..
