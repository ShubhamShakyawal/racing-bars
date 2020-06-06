import { prepareData } from './data-utils';
import { getDates, getDateString, formatDate } from './dates';
import { Data } from './models';
import { createRenderer } from './renderer';
import { createTicker } from './ticker';
import * as styles from './styles';
import { actions, store } from './store';
import { Options } from './options';
import { registerEvents, DOMEventSubscriber } from './events';
import { createScroller } from './scroller';

export function race(data: Data[], options: Options) {
  store.dispatch(actions.options.optionsLoaded(options));

  const element = document.querySelector(store.getState().options.selector) as HTMLElement;
  if (!element) {
    throw new Error('Cannot find element with this selector: ' + store.getState().options.selector);
  }

  if (store.getState().options.injectStyles) {
    styles.styleInject(store.getState().options.selector, 'top');
  }

  data = prepareData(data);

  const dates = getDates(data);
  // eslint-disable-next-line no-console
  console.log(data);
  // eslint-disable-next-line no-console
  console.log(dates);

  const ticker = createTicker(dates);

  const renderer = createRenderer(data);
  renderer.renderInitalView();

  store.subscribe(renderer.renderFrame);
  store.subscribe(DOMEventSubscriber(element));

  ticker.start();

  if (!store.getState().options.autorun) {
    ticker.stop();
  }

  registerEvents(element, ticker);
  window.addEventListener('resize', resize);

  function resize() {
    renderer.resize();
    registerEvents(element, ticker);
  }

  return {
    // TODO: validate user input
    start: () => {
      if (!store.getState().ticker.isRunning) {
        ticker.start();
      }
    },
    stop: () => {
      ticker.stop();
    },
    rewind: () => {
      ticker.skipBack();
    },
    fastforward: () => {
      ticker.skipForward();
    },
    loop: () => {
      ticker.loop();
    },
    inc: (value = 1) => {
      store.dispatch(actions.ticker.inc(value));
    },
    dec: (value = 1) => {
      store.dispatch(actions.ticker.dec(value));
    },
    getDate: () => store.getState().ticker.currentDate,
    setDate: (inputDate: string | Date) => {
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
    },
    getAllDates: () => dates.map((date: string) => formatDate(date, 'YYYY-MM-DD')),
    createScroller: () => {
      createScroller(element);
    },
  };
}
