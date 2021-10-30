import React from 'react';
import './Field.css'

const Field = React.forwardRef(({label, type}, ref) => {
    return (
        <div>
            <input placeholder={label} className="field-input" ref={ref} type={type} />
        </div>
    );
});

export default Field;