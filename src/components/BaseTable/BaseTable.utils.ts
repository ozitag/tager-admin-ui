function isScrollable(element: HTMLElement): boolean {
  return window.getComputedStyle(element).overflowY === 'auto';
}

export function getScrollableParent(element: HTMLElement): HTMLElement {
  return !element || element === document.body
    ? document.body
    : isScrollable(element)
    ? element
    : getScrollableParent(element.parentElement as HTMLElement);
}
