/* IMPORTANT: Unnecessary since CoreCMS v4.40.0 */
/**
 * Copy `data-aria-*` attributes to matching `aria-*` on the same nodes.
 * For HTML saved through WYSIWYG editors that strip unprefixed ARIA on publish.
 *
 * @param {ParentNode | null | undefined} [root=document]
 */
export default function promoteDataAriaAttributes(root = document) {
  if (!root) {
    return;
  }

  const elements =
    root instanceof Document
      ? root.querySelectorAll('*')
      : root instanceof Element
        ? [ root, ...root.querySelectorAll('*') ]
        : [];

  for (const el of elements) {
    if (!(el instanceof Element)) {
      continue;
    }
    for (const attr of [ ...el.attributes ]) {
      if (!attr.name.startsWith('data-aria-')) {
        continue;
      }
      el.setAttribute(
        'aria-' + attr.name.slice('data-aria-'.length),
        attr.value
      );
    }
  }
}
