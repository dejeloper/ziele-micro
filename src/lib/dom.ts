/** Atajos de selección del DOM. `$` devuelve un elemento o `null`; `$$` siempre un array. */

export function $<T extends Element = HTMLElement>(
  selector: string,
  scope: ParentNode = document,
): T | null {
  return scope.querySelector<T>(selector);
}

export function $$<T extends Element = HTMLElement>(
  selector: string,
  scope: ParentNode = document,
): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

const SCROLL_KEYS = new Set([
  " ",
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
]);

/** True si la pulsación scrollearía el documento: las teclas de navegación
 *  siempre; Space solo cuando el foco no está en un control que la consuma. */
export function isDocumentScrollKey(event: KeyboardEvent): boolean {
  if (!SCROLL_KEYS.has(event.key)) return false;
  if (event.key !== " ") return true;
  const target = event.target;
  return !(
    target instanceof Element &&
    target.closest("button, a, input, select, textarea")
  );
}
