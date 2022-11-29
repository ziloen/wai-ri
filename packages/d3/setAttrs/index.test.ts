import { setAttrs } from '.'
import { select } from 'd3'


describe('setAttrs', () => {

  it('should have types', () => {

    select('rect')
      .each(setAttrs((data, index, groups) => ({
        x: 1,
        y: 1,
        d: undefined
      })))
  })
})