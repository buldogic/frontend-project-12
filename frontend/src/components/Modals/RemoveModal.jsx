import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useChatApi from '../../utils/useChatApi.jsx';
import { selectors as modalsSelectors } from '../../slices/modalsSlice.js';

const RemoveModal = ({ handleClose }) => {
  const chatApi = useChatApi();
  const { t } = useTranslation();

  const targetId = useSelector(modalsSelectors.getTargetId);

  const handleRemoveChannel = async () => {
    try {
      await chatApi.removeChannel(targetId);
      toast.success(t('toastSuccess.removedChannel'));
      handleClose();
    } catch (error) {
      toast.error(t('errors.networkError'));
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
        <Button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirm')}</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={handleRemoveChannel}
          >
            {t('modals.remove')}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </>
  );
};

export default RemoveModal;
