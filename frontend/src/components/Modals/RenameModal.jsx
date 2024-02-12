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
import { selectors as modalsSelectors } from '../../slices/modalsSlice.js';

const RenameModal = ({ handleClose }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const targetId = useSelector(modalsSelectors.getTargetId);
  const currentChannel = channels.filter((channel) => channel.id === targetId);

  const chatApi = useChatApi();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentChannel[0].name,
    },
    validationSchema: modalSchema(
      channelsNames,
      t('validationRules.required'),
      t('validationRules.nameLength'),
      t('validationRules.duplicates'),
    ),
    onSubmit: async (values) => {
      const filteredName = filter.clean(values.name);

      try {
        await chatApi.renameChannel(targetId, filteredName);
        toast.success(t('toastSuccess.renamedChannel'));
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
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
              isInvalid={formik.errors.name && formik.touched.name}
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
              <Button variant="secondary" className="me-2" onClick={handleClose}>
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

export default RenameModal;
