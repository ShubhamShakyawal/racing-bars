import { styles, themes } from './generated-styles';

// modifed from https://github.com/egoist/style-inject
export function styleInject(selector: string, theme: string, insertAt = 'top') {
  let css = styles + (themes as any)[theme];

  if (!css || typeof document === 'undefined') {
    return;
  }

  // replace with selector
  css = css.split('__selector__').join(selector);

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style') as HTMLStyleElement | any;
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}