# Styled components media query
[![npm (scoped with tag)](https://img.shields.io/npm/v/styled-components-media-query/latest.svg?style=flat-square)](https://npmjs.com/package/styled-components-media-query)
[![npm](https://img.shields.io/npm/dt/styled-components-media-query.svg?style=flat-square)](https://npmjs.com/package/styled-components-media-query)

> Simple styled components utility that you can use for **building media queries**.

## Install
- yarn: `yarn add styled-components-media-query`
- npm: `npm i --save styled-components-media-query`

## Usage

```js
import { styled, css } from 'styled-components'
import MqInit from 'styled-components-media-query'

// initialize
const bp = {s: 400, sl: 500, m: 768, ml: 992, l: 1100}
const mq = MqInit({ bp })

// use like this
const ComponentStyled = styled.div`
 position: relative;
 ${mq('m')(css`
   position: absolute;
 `)}
 ${mq('l')(css`
   position: fixed;
 `)}
`
```

```css
/* compiled css */
.myClass {
  position: relative;
}
@media only screen and (min-width: 768px) {
  .myClass {
    position: absolute;
  }
}
@media only screen and (min-width: 1100px) {
  .myClass {
    position: fixed;
  }
}
```

##Api

---

<details><summary><code>MqInit({ bp, type })</code></summary><p>

- `bp` (object): a breakpoint object (optional).
- `type` (string): can be 'width' or 'height' (optional).

```js
import { styled, css } from 'styled-components'
import MqInit from 'styled-components-media-query'

const bp = {s: 300, m: 500, l: 800}

// this will build min-width, max-width queries
const mqWidth = MqInit({ bp, type: 'width' })

// this will build min-height, max-height queries
const mqHeight = MqInit({ bp, type: 'height' })
```

If you don't pass any value when initializing `MqInit`, it will use the default `bp` object and `type` string, which are:

```js
const bp = {  
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
const type = 'width'
```
</p></details>

---

<details><summary><code>mq(min, max)</code></summary><p>

- `min` (string|number|null): min-width or min-height value.
- `max` (string|number|null): max-width or max-height value.

You can use the mq function to specify min-width, max-width, min-height and max-height. Examples:

```js
import { styled, css } from 'styled-components'
import MqInit from 'styled-components-media-query'

const bp = {s: 300, m: 500, l: 800}
const mq = MqInit({ bp })
const mqHeight = MqInit({ bp, type: 'height' })

const CompStyled = styled.div`
  // min-width(500px)
  ${mq('m')(css``)}         
  
  // max-width(500px)
  ${mq(null, 'm')(css``)}
  
  // between min-width(500px) and max-width(799px)
  ${mq('m', 'l')(css``)}
  
  // min-height(500px)
  ${mqHeight('m')(css``)}         
  
  // max-height(500px)
  ${mqHeight(null, 'm')(css``)}
  
  // between min-height(500px) and max-height(799px)
  ${mqHeight('m', 'l')(css``)}
`
```

If you specify a string that is not in the `bp` object, it will throw an error, however, if needed, **you can pass a specific number directly**:

```js
import { styled, css } from 'styled-components'
import MqInit from 'styled-components-media-query'

const mq = MqInit()

const CompStyled = styled.div`
  // min-width(300px)
  ${mq(300)(css``)}         
  
  // max-width(603px)
  ${mq(null, 603)(css``)}
  
  // between min-width(23px) and max-width(900px)
  ${mq(23, 900)(css``)}
`
```

Also, the `css` helper is not necessary, so if you want you can use `mq` like this:

```js
import { styled } from 'styled-components'
import MqInit from 'styled-components-media-query'

const mq = MqInit()

const CompStyled = styled.div`
  // min-width(300px)
  ${mq(300)(``)} // note that 'css' helper is missing
`
```
</p></details>

---

<details><summary><code>mq</code></summary><p>

If you want to use the defaults you can require `mq` directly, although I don't recommend using my breakpoints, always better to tailor them for the specific project.
 
```js
import { styled, css } from 'styled-components'
import {mq} from 'styled-components-media-query'

const CompStyled = styled.div`
  // min-width(768px)
  ${mq('m')(css``)} 
`
```
</p></details>

---