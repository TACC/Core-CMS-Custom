import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from '../SectionHeader';

import styles from './SectionTableWrapper.module.css';

/**
 * A wrapper required for any table within a flex box.
 * (All `Section[…]` components are flex boxes.)
 *
 * It supports:
 *
 * - header (with actions, e.g. links, buttons, form)
 * - changing the element tag (like `section` instead of `article`)
 * - manual or automatic sub-components (i.e. header)
 *
 * If your table is within a `Section[…]` component, and does not employ this wrapper, you must manually resolve any layout issues.
 *
 * @see https://stackoverflow.com/q/41421512/11817077
 * @example
 * // wrap a table (no header) (that is a flex item)
 * <SectionTableWrapper>
 *   <AnyTableComponent {…} >
 * </SectionTableWrapper>
 * @example
 * // wrap a table, prepend a header, apply a className
 * <SectionTableWrapper
 *   styleName="table-wrapper"
 *   header={<SectionHeader>Heading</SectionHeader>}
 * >
 *   <AnyTableComponent {…} >
 * </SectionTableWrapper>
 * @example
 * // automatically build sub-components, with some customization
 * <SectionTableWrapper
 *   header="Dashboard"
 *   headerStyleName="header"
 *   headerActions={…}
 * >
 *   <AnyTableComponent {…} >
 * </SectionTableWrapper>
 * @example
 * // alternate syntax to automatically build content
 * <SectionTableWrapper
 *   content={
 *     <AnyTableComponent {…} >
 *   }
 * </SectionTableWrapper>
 * @example
 * // manually build sub-components
 * // WARNING: Manually built sub-components styles must be manually styled
 * <SectionTableWrapper
 *   manualHeader={
 *     // FAQ: The <SectionHeader> offers auto-built header's layout styles
 *     <SectionHeader
 *       styleName="…"
 *       actions={…}
 *       isForTable
 *     >
 *       Dashboard
 *     </SectionHeader>
 *   }
 *   // The "o-flex-item-table-wrap" (if available) mimics `isFlexItem`
 *   // CAVEAT: Manually load `.o-flex-item-table-wrap` from TACC/Core-Styles
 *   manualContent={
 *     <div class="o-flex-item-table-wrap">
 *       <AnyTableComponent {…} >
 *     </div>
 *   }
 * />
 * @example
 * // manually build content (alternate method)
 * // WARNING: Manually built sub-components styles must be manually styled
 * <SectionTableWrapper manualContent>
 *   // The "o-flex-item-table-wrap" (if available) mimics `isFlexItem`
 *   // CAVEAT: Manually load `.o-flex-item-table-wrap` from TACC/Core-Styles
 *   <div class="o-flex-item-table-wrap">
 *     <AnyTableComponent {…} >
 *   </div>
 * </SectionTableWrapper>
 */
function SectionTableWrapper({
  className,
  children,
  content,
  contentClassName,
  contentShouldScroll,
  header,
  headerActions,
  headerClassName,
  manualContent,
  manualHeader,
  tagName,
  isFlexItem,
}) {
  let styleName = '';
  const styleNameList = [styles['root']];
  const TagName = tagName;
  const shouldBuildHeader = header || headerClassName || headerActions;

  if (contentShouldScroll) {
    styleNameList.push(styles['should-scroll']);
  }
  if (!manualContent && isFlexItem) {
    styleNameList.push(styles['has-wrap']);
  }

  // Do not join inside JSX (otherwise arcane styleName error occurs)
  styleName = styleNameList.join(' ');

  // Allowing ineffectual prop combinations would lead to confusion
  // (unlike <Section>, prop `contentShouldScroll` IS allowed here)
  if (manualContent && (content || contentClassName)) {
    throw new Error(
      'When passing `manualContent`, the following props are ineffectual: `content`, `contentClassName`'
    );
  }
  if (manualHeader && (header || headerClassName || headerActions)) {
    throw new Error(
      'When passing `manualHeader`, the following props are ineffectual: `header`, `headerClassName`, `headerActions`'
    );
  }

  return (
    <TagName className={`${styleName} ${className}`}>
      {manualHeader ??
        (shouldBuildHeader && (
          <SectionHeader
            className={`${styles['header']} ${headerClassName}`}
            actions={headerActions}
            isForTable
          >
            {header}
          </SectionHeader>
        ))}
      {manualContent ? (
        <>
          {manualContent}
          {children}
        </>
      ) : (
        // This wrapper is the keystone of this component
        // WARNING: When using `manualContent`, user must implement this feature
        // FAQ: A table can NOT be a flex item; <div> wrap is safest solution
        // SEE: https://stackoverflow.com/q/41421512/11817077
        <div className={styles['wrap'] + ' ' + contentClassName}>
          {content}
          {children}
        </div>
      )}
    </TagName>
  );
}
SectionTableWrapper.propTypes = {
  /** Any additional className(s) for the root element */
  className: PropTypes.string,
  /** Alternate way to pass `manualContent` and `content` */
  children: PropTypes.node,
  /** The table content itself (content wrapper built automatically) */
  /* RFE: Ideally, limit this to one `InfiniteScrollTable` or `OtherTable` */
  /* SEE: https://github.com/facebook/react/issues/2979 */
  content: PropTypes.node,
  /** Any additional className(s) for the content element */
  contentClassName: PropTypes.string,
  /** Whether to allow content to scroll */
  contentShouldScroll: PropTypes.bool,
  /** The table header text (header element built automatically) */
  header: PropTypes.node,
  /** Any table actions for the header element */
  headerActions: PropTypes.node,
  /** Any additional className(s) for the header element */
  headerClassName: PropTypes.string,
  /** The table content (built by user) flag or element */
  /* RFE: Ideally, limit these to one relevant `Section[…]` component */
  /* SEE: https://github.com/facebook/react/issues/2979 */
  manualContent: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  /** The section header (built by user) element */
  manualHeader: PropTypes.element,
  /** Override tag of the root element */
  tagName: PropTypes.string,
  isFlexItem: PropTypes.bool,
};
SectionTableWrapper.defaultProps = {
  children: undefined,
  className: '',
  content: '',
  contentClassName: '',
  contentShouldScroll: false,
  header: '',
  headerActions: '',
  headerClassName: '',
  manualHeader: undefined,
  manualContent: undefined,
  tagName: 'article',
  isFlexItem: false,
};

export default SectionTableWrapper;
