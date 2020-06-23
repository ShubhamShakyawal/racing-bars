---
title: Loop
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using `loop`.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    startDate="1970-01-01"
    endDate="1980-01-01"
    loop={true}
  />
</div>

### Code

```html {7}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    startDate: '1970-01-01',
    endDate: '1980-01-01',
    loop: true,
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```