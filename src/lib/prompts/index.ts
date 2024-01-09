import { PromptGeneratorV1 } from './PromptGeneratorV1'
import { PromptGeneratorV2 } from './PromptGeneratorV2'

export type PromptInputs = {
  year: string | number
  countryName: string
  numberOfEarths: number
}

const PROMPT_VERSIONS = ['v1', 'v2'] as const

type PromptVersion = (typeof PROMPT_VERSIONS)[number]

export function generatePrompt(inputs: PromptInputs, version?: PromptVersion) {
  version = version ?? PROMPT_VERSIONS.at(-1) // default to latest version

  let generator: BasePromptGenerator

  switch (version) {
    case 'v1':
      generator = new PromptGeneratorV1()
      break
    case 'v2':
      generator = new PromptGeneratorV2()
      break
    default:
      throw new Error(`Unknown prompt version: ${version}`)
  }

  const prompt = generator.generate(inputs)

  return {
    prompt,
    version,
  }
}

export interface BasePromptGenerator {
  generate(inputs: PromptInputs): string
}
