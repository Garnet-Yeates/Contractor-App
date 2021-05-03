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
        <div className="add-entry-page">
            <div className="add-entry-form-container">
                <h3>{`Add Entry to ${name}`}</h3>
                {fields.map(field => (
                    <FieldContainer key={field.name}>
                        <FieldInput
                            field={field}
                            changeEntries={changeEntries}
                            getEntryValue={getEntryValue}
                        />
                    </FieldContainer>
                ))}
                <button className="btn btn-green btn-big">Submit</button>
            </div>
        </div>
    )
}


function FieldContainer({ children }) {
    return (
        <div className="field-container">
            {children}
        </div>
    )
}

function FieldInput({ field, field: { type, name }, changeEntries, getEntryValue }) {
    switch (type) {
        case "text":
            return (
                <input className="field-input"
                    value={getEntryValue(field.name)}
                    onChange={(e) => changeEntries({ [name]: e.target.value })}
                    placeholder={field.name}>
                </input>
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

