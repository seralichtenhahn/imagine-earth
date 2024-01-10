import { BasePromptGenerator, PromptInputs } from '.'

/*
 * PromptGeneratorV3:
 *
 * Changes:
 * - change
 */
export class PromptGeneratorV3 implements BasePromptGenerator {
  prompt: string
  severity: number // number between 0 and 1

  constructor() {
    this.prompt = ''
    this.severity = 0
  }

  generate(inputs: PromptInputs) {
    this.setSeverity(Number(inputs.year))

    return this.addBasePrompt()
      .addLocationPrompt(inputs.countryName)
      .addNumberOfEarths(inputs.numberOfEarths)
      .getPrompt()
  }

  addLocationPrompt(countryName: string) {
    this.prompt += `Landscape shot of ${countryName}, `

    return this
  }

  getPrompt() {
    return this.prompt
  }

  setSeverity(years: number) {
    this.severity = Math.min(Math.max(years / 100, 0.1), 1)

    return this
  }

  addBasePrompt() {
    this.prompt += 'extremely detailed CG unity 8k wallpaper, '

    return this
  }

  addNumberOfEarths(earths: number) {
    const getData = () => {
      const rounded = Math.round(earths * this.severity)

      switch (true) {
        case rounded <= 1:
          return 'a beautiful flourishing ecosystem with futuristic buildings'
        case rounded === 2:
          return 'gray and polluted environment with a few futuristic buildings'
        case rounded === 3:
          return 'a dystopian wasteland with broken futuristic buildings'
        case rounded === 4:
          return `signs of a past civilization with ruins of buildings and a few plants, small ${this.getNaturalDisaster()} in the distance`
        case rounded >= 5:
          return `a barren wasteland with signs of past life, apocalyptic scene, (massive  ${this.getNaturalDisaster()}:1.3)`
      }
    }

    this.prompt += `${getData()}, `

    return this
  }

  getNaturalDisaster() {
    const disasters = [
      'earthquake',
      'tsunami',
      'volcanic eruption',
      'meteor impact',
      'asteroid impact',
      'nuclear war',
      'supervolcano eruption',
      'superstorm',
      'solar flare',
    ]

    return disasters[Math.floor(Math.random() * disasters.length)]
  }
}
