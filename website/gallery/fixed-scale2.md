---
title: Fixed Scale
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using [`fixedScale`](/docs/documentation/options#fixedscale).

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/brand-values.csv"
    dataType="csv"
    title="Brand Values"
    fixedScale={true}
/>

</div>

### Code

```html {6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'Brand Values',
    fixedScale: true,
  };
  racingBars.loadData('/data/brand-values.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```