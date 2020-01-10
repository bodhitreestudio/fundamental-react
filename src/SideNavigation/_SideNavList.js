import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

class SideNavList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, className, hasParent, onItemSelect, open, selectedId, title, titleProps, isUtility, level, condensed, compact, ...rest } = this.props;

        const sideNavListClasses = classnames(
            {
                'fd-nested-list--text-only': !condensed,
                'fd-nested-list--compact': compact
            },
            'fd-nested-list',
            `level-${level}`,
            className
        );

        const sideNavContainerClass = classnames(
            {
                'fd-side-nav__main-navigation': !isUtility,
                'fd-side-nav__utility': isUtility
            }
        );

        const sideNavList = (
            <ul
                {...rest}
                aria-expanded={hasParent && open}
                aria-hidden={hasParent && !open}
                className={sideNavListClasses}>
                { title && <li {...titleProps} className='fd-nested-list__group-header'>{title}</li>}
                {React.Children.toArray(children).map(child => {
                    return React.cloneElement(child, {
                        isSubItem: hasParent,
                        onItemSelect: onItemSelect,
                        selected: selectedId === child.props.id,
                        selectedId: selectedId
                    });
                })}
            </ul>
        );

        const sideNav = hasParent ?
            sideNavList
            :
            (
                <div className={sideNavContainerClass}>
                    {sideNavList}
                </div>
            );

        return sideNav;
    }
}

SideNavList.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    compact: PropTypes.bool,
    condensed: PropTypes.bool,
    hasParent: PropTypes.bool,
    isUtility: PropTypes.bool,
    level: PropTypes.number,
    open: PropTypes.bool,
    selectedId: PropTypes.string,
    title: PropTypes.string,
    titleProps: PropTypes.object,
    onItemSelect: PropTypes.func
};

SideNavList.defaultProps = {
    level: 1
};

SideNavList.propDescriptions = {
    hasParent: '_INTERNAL USE ONLY._',
    open: '_INTERNAL USE ONLY._',
    selectedId: '_INTERNAL USE ONLY._',
    onItemSelect: '_INTERNAL USE ONLY._'
};

SideNavList.displayName = 'SideNav.List';

export default SideNavList;
