import { css } from 'styled-components'

export const bpDefaults = {
  xxxs: 0,
  xxs: 200,
  xs: 320,
  s: 400,
  sl: 500,
  m: 768,
  ml: 992,
  l: 1100,
  xl: 1200,
  xxl: 1300,
  xxxl: 1400,
  xxxxl: 1500,
  xxxxxl: 1600,
  xxxxxxl: 1700,
}

interface Ibp {
  readonly [bp: string]: number
}

export const getBpValue = (
  val: number | string | null | undefined,
  bp: Ibp
): number => {
  switch (typeof val) {
    case 'number':
      return val
    case 'string':
      if (!bp.hasOwnProperty(val)) {
        throw new Error(
          `Breakpoint error: oops, you passed a value that is not defined in the 'bp' object.`
        )
      }
      if (typeof bp[val] !== 'number') {
        throw new Error(
          `Breakpoint error: oops, you passed a value that is not a proper number.`
        )
      }

      return bp[val]
    default:
      return -1
  }
}

/**
 * Initialize breakpoints
 *
 * ### Usage
 * ```js
 * import { styled, css } from 'styled-components'
 * import BpInit from 'styled-components-media-query'
 *
 * // initialize
 * const bpList = {s: 400, sl: 500, m: 768, ml: 992, l: 1100}
 * const bp = BpInit({ bp: bpList })
 *
 * // use like this
 * const ComponentStyled = styled.div`
 *  position: relative;
 *  ${mq('m')(css`
 *    position: absolute;
 *  `)}
 *  ${mq('l')(css`
 *    position: fixed;
 *  `)}
 * `
 * ```
 *
 * @param bp      Pass a breakpoint object to customize the breakpoints you wish to use.
 * @param type    Pass a type string to either use min/max-width or min/max-height.
 * @returns       A styled-component css string.
 */

const BpInit = ({ bp = bpDefaults, type = 'width' } = {}) => (
  min?: string | number | null,
  max?: string | number | null
) => (contentCSS: []) => {
  const minV = getBpValue(min, bp)
  const maxV = getBpValue(max, bp)

  if (!Array.isArray(contentCSS)) {
    throw new Error(
      `Breakpoint error: oops, you passed a string instead of the styled-component css\`cssCodeHere\` helper.`
    )
  }

  if (minV >= 0 && !maxV) {
    return css`
      @media only screen and (min-${type}: ${minV}px) {
        ${contentCSS}
      }
    `
  } else if (!minV && maxV >= 0) {
    return css`
      @media only screen and (max-${type}: ${maxV - 1}px) {
        ${contentCSS}
      }
    `
  } else if (minV >= 0 && maxV >= 0) {
    return css`
      @media only screen and (min-${type}: ${minV}px) and (max-${type}: ${maxV -
      1}px) {
        ${contentCSS}
      }
    `
  }
  return css``
}

export const bpExec = BpInit()

export default BpInit
