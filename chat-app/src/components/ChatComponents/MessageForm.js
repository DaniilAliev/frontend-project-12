import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '../../context';

const MessageForm = () => {
  const { t } = useTranslation();

  const [isActive, setActive] = useState(false);

  const inputEl = useRef(null);

  const currentId = useSelector((state) => state.currentChannelId.id);

  const { addMessage } = useChatContext();

  useEffect(() => {
    inputEl.current.focus();
  }, [currentId]);

  const handleChange = (e) => {
    setActive(!!e.target.value);
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addMessage(values.body);
          resetForm();
          inputEl.current.focus();
          setActive(false);
        } catch (error) {
          console.log(error);
          toast.error(`${t('errors.networkError')}`);
          setActive(true);
        }
      }}
    >
      {() => (
        <Form className="py-1 border rounded-1" noValidate onChange={handleChange}>
          <div className="input-group has-validation">
            <Field innerRef={inputEl} name="body" aria-label="Новое сообщение" placeholder={t('chatPage.enterMessage')} className="border-0 p-0 ps-2 form-control" />
            <button type="submit" className="btn btn-group-vertical border-0" disabled={!isActive}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('chatPage.sendMessage')}</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
