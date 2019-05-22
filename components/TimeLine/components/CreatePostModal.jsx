import React from 'react';
import { Icon, Modal, Button, Upload, Input, Divider } from 'antd';
import { CreatePostButtons, CreatePostComponent } from './CreatePostComponent';

class CreatePostModal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { visible, handleOk, handleCancel } = this.props;
		return (
			<Modal
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				// mask={false}
				style={{
					top: '20',
					height: '100%',
					paddingRight: '0',
					paddingLeft: '0'
				}}
				className="create-post-modal"
				footer={null}>
				<CreatePostComponent
					handleOk={handleOk}
					minRows={8}
					placeholder={'What is on your mind?'}
				/>
			</Modal>
		);
	}
}

export default CreatePostModal;
