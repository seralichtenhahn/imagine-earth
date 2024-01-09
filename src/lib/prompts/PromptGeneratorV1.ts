import { BasePromptGenerator, PromptInputs } from '.'

export class PromptGeneratorV1 implements BasePromptGenerator {
  generate(inputs: PromptInputs) {
    const prompt = `(extremely detailed CG unity 8k wallpaper) Landscape shot of ${
      inputs.countryName
    } in ${inputs.year} years, ${this.numberOfEarhs(inputs.numberOfEarths)}`

    return prompt
  }

  numberOfEarhs(earths: number) {
    const rounded = Math.round(earths)

    switch (true) {
      case rounded <= 1:
        return 'a beautiful flourishing ecosystem with futuristic buildings'
      case rounded === 2:
        return 'gray and polluted environment with a few futuristic buildings'
      case rounded === 3:
        return 'a dystopian wasteland with broken futuristic buildings'
      case rounded === 4:
        return 'signs of a past civilization with ruins of buildings, and a few plants'
      case rounded >= 5:
        return 'a barren wasteland with no signs of life, big natural disaster'
    }
  }
}
