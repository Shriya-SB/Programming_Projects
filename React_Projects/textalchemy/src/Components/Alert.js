import React from 'react'
// Here we will create an components of alert to display the alerts
// From HTML not from javascript because it is blocking.
function Alert(props) {
    // Create an function of capitalize
    const capitalize = (word) => {
        const lower = word.toLowerCase(); // Convert the text in lower case
        return lower.charAt(0).toUpperCase() + lower.slice(1); // Return the string.
    }
    return (
        // Give necessary props required to give.
        <>
            <div style={{ height: '50px' }}>
                {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                </div>}
            </div>
        </>
    )
}

export default Alert