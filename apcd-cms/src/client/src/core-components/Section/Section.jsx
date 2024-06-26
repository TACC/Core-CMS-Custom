import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../SectionHeader';
import SectionContent from '../SectionContent';
import { LAYOUTS, DEFAULT_LAYOUT } from '../SectionContent';

import styles from './Section.module.css';

/**
 * A section layout structure that supports:
 *
 * - messages (automatically loads intro message)
 * - header (with actions, e.g. links, buttons, form)
 * - content (that will be arranged in the layout you choose)
 * - manual or automatic sub-components (i.e. header, content)
 *
 * @example
 * // manually build messages, automatically build intro message (by name)
 * <Section
 *   introMessageName="DASHBOARD"
 *   messages={<>…</>}
 * />
 * @example
 * // overwrite text of an automatic intro message, no additional messages
 * <Section
 *   introMessageName="DASHBOARD"
 *   introMessageText={`We welcome you to the dashboard, ${givenName}`}
 * />
 * @example
 * // define text for a manual intro message, no additional messages
 * <Section
 *   introMessageText={`We welcome you to this page, ${givenName}`}
 * />
 * @example
 * // add class to <body>, automatically build sub-components
 * // FAQ: class on <body> + `Bob.global.css` + `body.global-bob-class`
 * //      = unlimited, explicit, isolated CSS side effects
 * <Section
 *   bodyClassName="has-loaded-some_section"
 *   content={…}
 * />
 * @example
 * // automatically build sub-components, with some customization
 * <Section
 *   header="Dashboard"
 *   headerStyleName="header"
 *   headerActions={…}
 *   content={…}
 *   contentStyleName="items"
 *   contentLayoutName="twoColumn"
 * />
 * @example
 * // alternate syntax to automatically build content
 * <Section
 *   contentStyleName="items"
 *   contentLayoutName="twoColumn"
 * >
 *   {…} <!-- i.e. content -->
 * </Section>
 * @example
 * // manually build sub-components
 * // WARNING: This component's styles are NOT applied to manual sub-components
 * // FAQ: The <SectionHeader> offers auto-built header's layout styles
 * // FAQ: The <SectionContent> offers auto-built content's layout styles
 * <Section
 *   manualHeader={
 *     <SectionHeader {…} />
 *   }
 *   manualContent={
 *     <SectionContent {…} />
 *   }
 * />
 * @example
 * // manually build content (alternate method)
 * // WARNING: This component's styles are NOT applied to manual sub-components
 * // FAQ: The <SectionContent> offers auto-built content's layout options
 * <Section manualContent>
 *   <SectionContent {…} />
 * />
 */
function Section({
  bodyClassName,
  children,
  className,
  content,
  contentClassName,
  contentLayoutName,
  contentShouldScroll,
  header,
  headerActions,
  headerClassName,
  manualContent,
  manualHeader,
  messages,
}) {
  const shouldBuildHeader = header || headerClassName || headerActions;

  // Allowing ineffectual prop combinations would lead to confusion
  if (
    manualContent &&
    (content || contentClassName || contentLayoutName || contentShouldScroll)
  ) {
    throw new Error(
      'When passing `manualContent`, the following props are ineffectual: `content`, `contentClassName`, `contentLayoutName`, `contentShouldScroll`'
    );
  }
  if (manualHeader && (header || headerClassName || headerActions)) {
    throw new Error(
      'When passing `manualHeader`, the following props are ineffectual: `header`, `headerClassName`, `headerActions`'
    );
  }

  useEffect(() => {
    if (bodyClassName) document.body.classList.add(bodyClassName);

    return function cleanup() {
      if (bodyClassName) document.body.classList.remove(bodyClassName);
    };
  }, [bodyClassName]);

  return (
    <section className={`${styles['root']} ${className}`}>
      {messages}
      {manualHeader ??
        (shouldBuildHeader && (
          <SectionHeader
            className={`${headerClassName}`}
            actions={headerActions}
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
        <SectionContent
          tagName="main"
          className={`${contentClassName}`}
          layoutName={contentLayoutName}
          shouldScroll={contentShouldScroll}
        >
          {content}
          {children}
        </SectionContent>
      )}
    </section>
  );
}
Section.propTypes = {
  /** Name of class to append to body when section is active */
  bodyClassName: PropTypes.string,
  /** Alternate way to pass `manualContent` and `content` */
  children: PropTypes.node,
  /** Any additional className(s) for the root element */
  className: PropTypes.string,
  /** The section content children (content element built automatically) */
  content: PropTypes.node,
  /** Any additional className(s) for the content element */
  contentClassName: PropTypes.string,
  /** The name of the layout by which to arrange the content children */
  contentLayoutName: PropTypes.oneOf(LAYOUTS),
  /** Whether to allow content to scroll */
  contentShouldScroll: PropTypes.bool,
  /** The section header text (header element built automatically) */
  header: PropTypes.node,
  /** Any section actions for the header element */
  headerActions: PropTypes.node,
  /** Any additional className(s) for the header element */
  headerClassName: PropTypes.string,
  /** The section content (built by user) flag or element */
  /* RFE: Ideally, limit these to one relevant `Section[…]` component */
  /* SEE: https://github.com/facebook/react/issues/2979 */
  manualContent: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  /** The section header (built by user) element */
  manualHeader: PropTypes.element,
  /** Any message(s) (e.g. <Message>) (but NOT a intro message) */
  messages: PropTypes.node,
};
Section.defaultProps = {
  bodyClassName: '',
  children: undefined,
  className: '',
  content: '',
  contentClassName: '',
  contentLayoutName: DEFAULT_LAYOUT,
  contentShouldScroll: false,
  header: '',
  headerActions: '',
  headerClassName: '',
  manualContent: undefined,
  manualHeader: undefined,
  messages: '',
  introMessageName: '',
  introMessageText: '',
};

export default Section;
