import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import useChatApi from '../utils/useChatApi.jsx';
import useAuth from '../utils/useAuth.jsx';
import { messageSchema } from '../utils/validator.js';

const NewMessageForm = ({ currentChannelId }) => {
  const inputRef = useRef(null);
  const chatApi = useChatApi();
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  filter.add(filter.getDictionary('ru'));

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageSchema(t('validationRules.required')),
    onSubmit: async (values) => {
      const filteredMessage = filter.clean(values.body);
      try {
        await chatApi.addMessage(filteredMessage, currentChannelId, currentUser.username);
        formik.resetForm();
      } catch (err) {
        formik.setSubmitting(false);
        toast.error(t('errors.networkError'));
      }
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentChannelId, formik.values.body]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation={!formik.dirty || formik.isValid}>
          <Form.Control
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            className="border-0 p-0 ps-2"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.inputMessage')}
            disabled={formik.isSubmitting}
          />
          <Button variant="group-vertical" type="submit" className="border-0" disabled={!formik.dirty || !formik.isValid}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('messages.sendMessage')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessageForm;
