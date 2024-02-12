import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { modalSchema } from '../../utils/validator.js';
import useChatApi from '../../utils/useChatApi.jsx';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';

const AddModal = ({ handleClose }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const chatApi = useChatApi();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: modalSchema(
      channelsNames,
      t('validationRules.required'),
      t('validationRules.nameLength'),
      t('validationRules.duplicates'),
    ),
    onSubmit: async (values) => {
      const filteredValue = filter.clean(values.name);

      try {
        await chatApi.addChannel({ name: filteredValue });
        toast.success(t('toastSuccess.createdChannel'));
        handleClose();
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.focus();
          return;
        }
        toast.error(t('errors.networkError'));
      }
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
        <Button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              type="text"
              ref={inputRef}
              id="name"
              name="name"
              className="mb-2"
              isInvalid={formik.errors.name}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <Form.Label visuallyHidden htmlFor="name">
              {t('modals.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('modals.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                {t('modals.send')}
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddModal;
