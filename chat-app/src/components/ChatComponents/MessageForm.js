import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useSelector } from "react-redux/es/hooks/useSelector";
import _ from 'lodash';
import { useAuth, useChat } from "../../context";

const MessageForm = () => {
    const [isActive, setActive] = useState(false)

    const inputEl = useRef(null);

    const currentId = useSelector((state) => state.currentChannelId.id);

    const { user } = useAuth();

    const { addMessage } = useChat()

    useEffect(() => {
        inputEl.current.focus();
    }, [currentId]);

    const handleChange = (e) => {
        e.target.value  ? setActive(true) : setActive(false);
    }

    return (
        <Formik
            initialValues={{body: ''}}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                const sentMessage = {
                    id: _.uniqueId(),
                    meassage: values.body,
                    user: user.username,
                };

                console.log(sentMessage);

                addMessage(sentMessage);

                resetForm();

                inputEl.current.focus();

                setSubmitting(false);
            }}
        >
            {() => (
                <Form className="py-1 border rounded-1" noValidate onChange={handleChange}>
                    <div className="input-group has-validation">
                        <Field innerRef={inputEl} name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control"/>
                        <button type="submit"className="btn btn-group-vertical" disabled={!isActive}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                            </svg>
                            <span className="visually-hidden">Отправить</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default MessageForm;