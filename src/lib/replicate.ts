import Replicate from 'replicate'
import { z } from 'zod'

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN environment variable is not set')
}

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const MODELS = {
  'stability-ai/sdxl':
    'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
  'stability-ai/stable-diffusion':
    'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
} as const

interface GenerateImageWithStableDiffusionOptions {
  prompt: string
  negative_prompt?: string
  callbackUrl?: string
  model?: keyof typeof MODELS
}

export const generateImageWithStableDiffusion = async ({
  prompt,
  negative_prompt,
  callbackUrl,
  model = 'stability-ai/sdxl',
}: GenerateImageWithStableDiffusionOptions) => {
  const output = await replicate.run(MODELS[model], {
    input: {
      prompt,
      negative_prompt,
      num_outputs: 1,
      width: 768,
      height: 768,
      refine: 'expert_ensemble_refiner',
      scheduler: 'K_EULER',
      lora_scale: 0.6,
      guidance_scale: 7.5,
      apply_watermark: false,
      high_noise_frac: 0.8,
      prompt_strength: 0.8,
      num_inference_steps: 25,
    },
    ...(callbackUrl && {
      webhook: callbackUrl,
      webhook_events_filter: ['completed'],
    }),
  })

  if (callbackUrl) {
    return
  }

  const outputSchema = z.tuple([z.string()])

  const [imageUrl] = outputSchema.parse(output)

  return imageUrl
}
