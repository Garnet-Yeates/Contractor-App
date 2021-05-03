import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { createTemplate as createTemplateAction } from '../../Sidebar/TreeView/Bookkeeping/BookkeepingController'
import { connect } from 'react-redux'

import './Styles.scss'
import { CLEAR_TEMPLATE_NAME_ERRORS } from '../../../Redux/actions/ActionTypes'

const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
};

const swap = (i1, i2, arr) => {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}

const moveField = (index, delta, fields, setFields) => {
    swap(index, index + delta, fields);
    setFields([...fields]);
}

const deleteField = (index, fields, setFields) => {
    fields.splice(index, 1);
    setFields([...fields]);
}

let id = 0;
const nextId = () => {
    return id++;
}

const addField = (fields, setFields) => {
    setFields([...fields, {
        id: nextId(),
        name: "",
        type: "text",
        errors: {},
    }])
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => ref.current = value);
    return ref.current;
}

function CreateTemplatePage(props) {
    // From store
    let { createTemplate, clearTemplateNameError } = props;

    const [templateName, setTemplateName] = useState("");
    const [fields, setFields] = useState([]);

    useEffect(() => {
        clearTemplateNameError();
    }, [])

    let prevFields = usePrevious(fields);
    let newestInputRef = useRef();

    useEffect(() => {
        if (prevFields && fields.length > prevFields.length) {
            newestInputRef.current.focus();
        }
    }, [fields])

    return (
        <div className="create-template-page">
            <div className="create-template-form-container">
                <h3>{templateName === "" ? ("New Template") : (templateName + " Template")}</h3>
                <StateMappedInput
                    className="template-name-input"
                    placeholder="Template Name"
                    onKeyPress={({ key }) => key === "Enter" && fields.length === 0 && addField(fields, setFields)}
                    state={templateName}
                    stateSetter={setTemplateName}
                />

                <FieldList fields={fields} setFields={setFields} newestInputRef={newestInputRef} />

                <ErrorProofButton
                    className="big-btn btn-green"
                    onClick={() => addField(fields, setFields)}
                    fields={fields} setFields={setFields}>
                    Add Field
                    </ErrorProofButton>

                <SubmitButton
                    createTemplate={createTemplate}
                    templateName={templateName}
                    setTemplateName={setTemplateName}
                    fields={fields}
                    setFields={setFields} />
                <div className="red-text bigger">{props.templateNameError}</div>
            </div>
        </div>
    )
}


function FieldList({ fields, setFields, newestInputRef }) {
    return (
        <ul>
            {fields.map((field, index) => {
                let { name, type, error, id } = field;
                return (
                    <motion.div
                        style={{}}
                        className="field-div"
                        key={id}
                        layout
                        transition={spring}
                    >
                        <div className="input-with-err">
                            <h5>Field Name</h5>
                            <input
                                placeholder="Enter Field Name"
                                value={name}
                                onKeyPress={({ key }) => key === "Enter" && !fieldErrors(fields, setFields) && addField(fields, setFields)}
                                onChange={({ target: { value } }) => {
                                    field.name = value;
                                    setFields([...fields])
                                }}
                                ref={index === fields.length - 1 ? newestInputRef : undefined}
                            />
                            <div className="red-text">{error}</div>
                        </div>
                        <div className="input-with-err">
                            <h5>Field Type</h5>
                            <select>
                                <option>Text</option>
                            </select>
                        </div>
                        <UpDownButton index={index} fields={fields} setFields={setFields} />
                        <button className="btn btn-red" onClick={() => deleteField(index, fields, setFields)}>Delete Field</button>
                    </motion.div>
                )
            })}
        </ul>
    )
}


function StateMappedInput(props) {
    const { stateSetter, state, ...rest } = props;
    return (
        <input
            value={state}
            onChange={({ target: { value } }) => stateSetter(value)}
            {...rest}
        />
    )
}

function UpDownButton({ index, fields, setFields }) {
    const render = () => {
        if (index === 0 && index !== fields.length - 1)
            return <button className="btn btn-blue bot-margin" onClick={() => moveField(index, 1, fields, setFields)}>Move down</button>
        else if (index !== fields.length - 1)
            return (
                <>
                    <button className="btn btn-blue bot-margin margin-right" onClick={() => moveField(index, -1, fields, setFields)}>Move up</button>
                    <button className="btn btn-blue bot-margin margin-left" onClick={() => moveField(index, 1, fields, setFields,)}>Move down</button>
                </>
            )
        else if (index !== 0)
            return <button className="btn btn-blue bot-margin" onClick={() => moveField(index, -1, fields, setFields)}>Move up</button>
    }

    return (
        <div className="up-down-btn-container">
            {render()}
        </div>
    )
}


function SubmitButton({ createTemplate, templateName, setTemplateName, fields, setFields }) {
    const onSubmit = () => {
        createTemplate({
            name: templateName,
            fields,
        }, () => {
            setTemplateName("");
            setFields([]);
        })
    }

    return (
        fields.length > 0 &&
        <ErrorProofButton
            className={'big-btn btn-red'}
            fields={fields}
            setFields={setFields}
            onClick={() => onSubmit()}>
            Create Template
        </ErrorProofButton>
    )
}


function fieldErrors(fields, setFields) {
    let ret = false;

    for (let field of fields) {
        field.error = undefined;
        if (field.name === "") {
            field.error = "Please Enter Field Name"
            ret = true;
            continue;
        }
    }

    for (let field of fields) {
        for (let other of fields) {
            if (other == field)
                continue;
            if (field.name && field.name !== "" && field.name.toUpperCase() === other?.name?.toUpperCase()) {
                field.error = "Duplicate Field"
                other.error = "Duplicate Field"
                ret = true;
                continue;
            }
        }
    }

    if (ret) {
        setFields([...fields]);
    }

    return ret;
}


function ErrorProofButton({ fields, onClick, setFields, className, children }) {
    const check = () => {
        if (!fieldErrors(fields, setFields)) {
            onClick();
        }
    }
    return <button className={className} onClick={() => check()}>
        {children}
    </button>
}



const mapStateToProps = (state) => ({
    templateNameError: state.bookkeeping.errors.templateName,
    currContent: state.treeView.currContent,
})

const mapDispatchToProps = (dispatch) => ({
    createTemplate: (template, onError) => { dispatch(createTemplateAction(template, onError)) },
    clearTemplateNameError: () => dispatch({ type: CLEAR_TEMPLATE_NAME_ERRORS })
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplatePage)
