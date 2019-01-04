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
          `Media Query error: oops, you passed a value that is not defined in the 'bp' object.`
        )
      }
      if (typeof bp[val] !== 'number') {
        throw new Error(
          `Media Query error: oops, you passed a value that is not a proper number.`
        )
      }

      return bp[val]
    default:
      return -1
  }
}

/**
 * Initialize media query
 *
 * ### Usage
 * ```js
 * import { styled, css } from 'styled-components'
 * import MqInit from 'styled-components-media-query'
 *
 * // initialize
 * const bp = {s: 400, sl: 500, m: 768, ml: 992, l: 1100}
 * const mq = MqInit({ bp })
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

const MqInit = ({ bp = bpDefaults, type = 'width' } = {}) => (
  min?: string | number | null,
  max?: string | number | null
) => (contentCSS: any) => {
  if (!Array.isArray(contentCSS) || typeof contentCSS !== 'string') {
    throw new Error(
      `Media Query error: oops, you passed a invalid argument. Valid arguments are 'string' or the styled components 'css' helper.`
    )
  }

  const minV = getBpValue(min, bp)
  const maxV = getBpValue(max, bp)
  const content = Array.isArray(contentCSS) ? contentCSS : css`${contentCSS}`

  if (minV >= 0 && maxV === -1) {
    return css`
      @media only screen and (min-${type}: ${minV}px) {
        ${content}
      }
    `
  } else if (minV === -1 && maxV >= 0) {
    return css`
      @media only screen and (max-${type}: ${maxV - 1}px) {
        ${content}
      }
    `
  } else if (minV >= 0 && maxV >= 0) {
    return css`
      @media only screen and (min-${type}: ${minV}px) and (max-${type}: ${maxV -
      1}px) {
        ${content}
      }
    `
  }
  return css``
}

export const mqExec = MqInit()

export default MqInit
