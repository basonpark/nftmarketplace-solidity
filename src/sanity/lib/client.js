import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token:'sk2aYVPGELLlPqN8b2PKJWxQdkEVb7wY9yazp0MwXR2twF91wPxhoExIE5DTBRnlPTDkh57U7EtJIUJUfBQWR7K6MNk7ItWh8uV9pYAqJ4gH9P9dyb9U7AYVyzQQ6Yrl2OxUYhCe0b14EJSLBYxCwSY18jdLUr2qBa4r4jzgAwYVddLrKnUO' // Set to false if statically generating pages, using ISR or tag-based revalidation
})
