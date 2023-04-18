import React from 'react';
import { Form } from 'react-bootstrap';

export const InputText = ({
    className,
    type,
    name,
    placeholder,
    maxLength,
    required,
    changeFunction,
    blurFunction
}) => {
    return (
        <>
        <Form.Control  className={className} type={type} name={name} placeholder={placeholder} maxLength={maxLength} required={required}
        onChange={(e)=> changeFunction(e)} onBlur={(e)=>blurFunction(e)}   />
        </>
    )
}
