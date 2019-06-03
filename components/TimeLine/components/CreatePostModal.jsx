import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { CreatePostComponent } from './CreatePostComponent';
import { STRINGS } from '../constants';

const { CREATE_POST_PLACEHOLDER } = STRINGS;

const CreatePostModal = props => {
    const {
        visible, handleOkFunction, closeModal, handleOnChange, textValue,
    } = props;

    return (
        <Modal
          visible={visible}
          onOk={handleOkFunction}
          onCancel={closeModal}
          className="create-post-modal"
          footer={null}
        >
            <CreatePostComponent
              handleOkFunction={handleOkFunction}
              rowHeight={5}
              InputPlaceholder={CREATE_POST_PLACEHOLDER}
              handleOnChange={handleOnChange}
            // textValue={textValue}
            />
        </Modal>
    );
};

export default CreatePostModal;
CreatePostModal.propTypes = {
    closeModal: PropTypes.func,
    handleOkFunction: PropTypes.func,
    handleStatusChange: PropTypes.func,
    visible: PropTypes.bool,
};
