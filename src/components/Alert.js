import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger"){
            word = "Failed"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <div style={{ height: '75px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
                {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            /> */}
            </div>}
        </div>
    )
}

// props.alert && :
// means if props.alert is not equal to 'null' then do this

