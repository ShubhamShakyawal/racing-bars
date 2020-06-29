import * as d3 from './d3';
import { prepareData } from './data-utils';
import { getDateString } from './dates';
import { Data, WideData } from './data';
import { createRenderer } from './renderer';
import { createTicker } from './ticker';
import { styleInject } from './styles';
import { actions, createStore, rootReducer } from './store';
import { Options } from './options';
import { registerEvents, DOMEventSubscriber } from './events';
import { createScroller } from './scroller';
import { safeName } from './utils';
import { Race } from './models';

export function race(data: Data[] | WideData[], options: Partial<Options> = {}): Race {
  const store = createStore(rootReducer);

  store.dispatch(actions.options.optionsLoaded(options));
  const { selector, injectStyles, theme, autorun } = store.getState().options;

  const root = document.querySelector(selector) as HTMLElement;
  if (!root) {
    return (undefined as unknown) as Race;
  }

  if (injectStyles) {
    styleInject(selector, theme, 'top');
  }

  const preparedData = prepareData(data as Data[], store);

  const ticker = createTicker(store);

  const renderer = createRenderer(preparedData, store);
  renderer.renderInitalView();

  store.subscribe(renderer.renderFrame);
  store.subscribe(DOMEventSubscriber(store));

  ticker.start('loaded');

  if (!autorun) {
    ticker.stop('loaded');
  }

  registerEvents(store, ticker);
  window.addEventListener('resize', resize);

  function resize() {
    renderer.resize();
    registerEvents(store, ticker);
  }

  return {
    // TODO: validate user input
    start: () => {
      if (!store.getState().ticker.isRunning) {
        ticker.start('apiStart');
      }
    },
    stop: () => {
      ticker.stop('apiStop');
    },
    rewind: () => {
      ticker.skipBack('apiSkipBack');
    },
    fastforward: () => {
      ticker.skipForward('apiSkipForward');
    },
    loop: () => {
      ticker.loop();
    },
    inc: (value = 1) => {
      store.dispatch(actions.ticker.inc('apiInc', value));
    },
    dec: (value = 1) => {
      store.dispatch(actions.ticker.dec('apiDec', value));
    },
    getDate: () => store.getState().ticker.currentDate,
    setDate: (inputDate: string | Date) => {
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate), 'apiSetDate'));
    },
    getAllDates: () => [...store.getState().ticker.dates],
    createScroller: () => {
      createScroller(root, store);
    },
    selections: {
      select: (name: string) => {
        d3.select(root)
          .select('rect.' + safeName(name))
          .classed('selected', true);
        store.dispatch(actions.data.addSelection(name));
      },
      unselect: (name: string) => {
        d3.select(root)
          .select('rect.' + safeName(name))
          .classed('selected', false);
        store.dispatch(actions.data.removeSelection(name));
      },
      unselectAll: () => {
        d3.select(root).selectAll('rect').classed('selected', false);
        store.dispatch(actions.data.resetSelections());
      },
    },
    groups: {
      hide: (group: string) => {
        store.dispatch(actions.data.addFilter(group));
      },
      show: (group: string) => {
        store.dispatch(actions.data.removeFilter(group));
      },
      showOnly: (group: string) => {
        store.dispatch(actions.data.allExceptFilter(group));
      },
      showAll: () => {
        store.dispatch(actions.data.resetFilters());
      },
    },
  };
}
