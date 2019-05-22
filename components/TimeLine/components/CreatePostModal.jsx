import React from 'react';
import {
    Modal
} from 'antd';
import PropTypes from 'prop-types';
import CreatePostComponent from './CreatePostComponent';

const CreatePostModal = props => {
    const { visible, handleOk, handleCancel } = props;

    return (
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{
                top: '20',
                height: '100%',
                paddingRight: '0',
                paddingLeft: '0',
            }}
          className="create-post-modal"
          footer={null}
        >
            <CreatePostComponent
              handleOk={handleOk}
              rowHeight={18}
              InputPlaceholder="What is on your mind?"
            />
        </Modal>
    );
};

export default CreatePostModal;
CreatePostModal.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};
