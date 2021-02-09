function isScrollable(element: HTMLElement): boolean {
  return window.getComputedStyle(element).overflowY === 'auto';
}

export function getScrollableParent(element: HTMLElement | null): HTMLElement {
  return !element || element === document.body
    ? document.body
    : isScrollable(element)
    ? element
    : getScrollableParent(element.parentElement);
}

function getParents(
  element: HTMLElement,
  parents: Array<HTMLElement>
): Array<HTMLElement> {
  return element.parentElement
    ? getParents(element.parentElement, [...parents, element])
    : parents;
}

function style(element: HTMLElement, prop: string) {
  return getComputedStyle(element, null).getPropertyValue(prop);
}

function overflow(element: HTMLElement) {
  return (
    style(element, 'overflow') +
    style(element, 'overflow-y') +
    style(element, 'overflow-x')
  );
}

export function getScrollParentElements(
  element: HTMLElement
): {
  firstVerticalScrollParentElement: HTMLElement;
  scrollParentElements: Array<HTMLElement>;
} {
  const regex = /(auto|scroll)/;

  const scrollParentElements = getParents(element, []).filter((element) =>
    regex.test(overflow(element))
  );

  const firstVerticalScrollParentElement =
    scrollParentElements.find((element) =>
      regex.test(style(element, 'overflow-y'))
    ) ?? document.body;

  return {
    firstVerticalScrollParentElement,
    scrollParentElements: [...scrollParentElements, document.body],
  };
}
