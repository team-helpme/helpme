import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import CreatePostComponent from './CreatePostComponent';

const CreatePostModal = props => {
    const { visible, handleOkFunction, handleCancel } = props;

    return (
        <Modal
          visible={visible}
          onOk={handleOkFunction}
          onCancel={handleCancel}
          className="create-post-modal"
          footer={null}
        >
            <CreatePostComponent
              handleOkFunction={handleOkFunction}
              rowHeight={5}
              InputPlaceholder="What is on your mind?"
            />
        </Modal>
    );
};

export default CreatePostModal;
CreatePostModal.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleOkFunction: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};
