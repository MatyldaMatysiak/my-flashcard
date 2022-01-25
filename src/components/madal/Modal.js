import React from "react";
import './_modal.scss'

export default function Modal({children, open}) {
    return <div className={`modal ${open}`}>{children}</div>;
}