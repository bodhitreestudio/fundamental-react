import classnames from 'classnames';
import { FORM_STATES } from '../utils/constants';
import FormItem from './FormItem';
import FormLabel from './FormLabel';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const getCheckStatus = (checked, indeterminate) => {
    if (indeterminate) {
        return 'mixed';
    } else if (checked) {
        return 'true';
    } else {
        return 'false';
    }
};

const Checkbox = React.forwardRef(({
    checked,
    className,
    compact,
    defaultChecked,
    disabled,
    disableStyles,
    id,
    indeterminate,
    inline,
    inputProps,
    labelProps,
    name,
    onChange,
    value,
    state,
    ...props
}, ref) => {

    const inputEl = useRef();

    useEffect(() => {
        inputEl && (inputEl.current.indeterminate = indeterminate);
    });

    useEffect(() => {
        if (!disableStyles) {
            require('fundamental-styles/dist/checkbox.css');
        }
    }, []);

    const classes = classnames(
        className,
        'fd-checkbox',
        { [`is-${state}`]: state }
    );

    return (
        <FormItem
            {...props}
            disableStyles={disableStyles}
            disabled={disabled}
            isInline={inline}
            ref={ref}>
            <FormLabel {...labelProps}
                disableStyles={disableStyles}
                disabled={disabled}
                isCheckbox>
                <input
                    {...inputProps}
                    aria-checked={getCheckStatus(checked, indeterminate)}
                    checked={checked || defaultChecked}
                    className={classes}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onChange={(e) => {
                        onChange(e, !checked);
                    }}
                    ref={inputEl}
                    type='checkbox' />
                {value}
            </FormLabel>
        </FormItem>
    );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    compact: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    disableStyles: PropTypes.bool,
    id: PropTypes.string,
    indeterminate: PropTypes.bool,
    inline: PropTypes.bool,
    inputProps: PropTypes.object,
    labelProps: PropTypes.object,
    name: PropTypes.string,
    state: PropTypes.oneOf(FORM_STATES),
    value: PropTypes.string,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    onChange: () => {}
};

Checkbox.propDescriptions = {
    checked: 'Set to **true** when checkbox input is checked and a controlled component.',
    defaultChecked: 'Set to **true** when the checkbox input is checked and an uncontrolled component.',
    indeterminate: 'When true, the checkbox renders a "mixed" state.',
    inline: '_INTERNAL USE ONLY._',
    inputProps: 'Props to be spread to the component `<input>` element.',
    labelProps: 'Props to be spread to the component `<label>` element.',
    name: 'Sets the `name` for the checkbox input.',
    value: 'Sets the `value` for the checkbox input.'
};

export default Checkbox;
