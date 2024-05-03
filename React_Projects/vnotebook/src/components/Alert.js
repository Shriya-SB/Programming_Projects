import React from 'react';
// Here instead of using javascript native blocking alert use bootrap alert.
const Alert = (props) => {
    // Create a function of capitalize
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <>
            {/* Write the logic of alert */}
            <div style={{ height: '50px' }}>
                {
                    // Give a type and message.
                    (props.alert) 
                    && 
                    (<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                        <strong>{capitalize(props.alert.type)}</strong> 
                    :
                        {props.alert.msg}
                    </div>)
                }
            </div>
        </>
    )
}

export default Alert;