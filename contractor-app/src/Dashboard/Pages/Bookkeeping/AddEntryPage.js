import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Styles.scss'

function AddEntryPage({ template, template: { name, fields } }) {

    const [entries, setEntries] = useState({});

    useEffect(() => {
        //  console.log(entries);
    }, [entries])

    const changeEntries = (changeObj) => {
        setEntries({
            ...entries,
            ...changeObj,
        })
    }

    const getEntryValue = (fieldName) => {
        return entries[fieldName];
    }

    return (
        <div className="add-entry page">
            <div className="form-container">
                <h2>{`Add Entry to ${name}`}</h2>
                {fields.map(field => (
                    <FieldInput
                        key={field.name}
                        field={field}
                        changeEntries={changeEntries}
                        getEntryValue={getEntryValue}
                    />
                ))}
                <button className="btn green big">Submit</button>
            </div>
        </div>
    )
}

function FieldInput({ field, field: { type, name }, changeEntries, getEntryValue }) {
    switch (type) {
        case "text":
            return (
                <div className="field-container">
                    <input className="field-input"
                        value={getEntryValue(field.name)}
                        onChange={(e) => changeEntries({ [name]: e.target.value })}
                        placeholder={field.name}>
                    </input>
                </div>
            )
        default:
            return (<p>Disgraceful</p>)
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryPage)

