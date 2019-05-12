import React from 'react';
import {
    Icon, Modal, Button, Upload, Input, Divider
} from 'antd';
import PropTypes from 'prop-types';


const { TextArea } = Input;

/**
 * Helper function that is used for creating the input part of the post *component
 *
 * @function
 * @param {String} placeholder - the placeholder for the input component
 * @param {integer} minRows - the minimum amount of rows that the input component will initially contain
 * @return {Object} the input part of the createpost component
 */
const CreatePostInput = props => (
    <TextArea
  placeholder={props.placeholder}
  size="small"
        className="compose-textarea"
        autosize={props.minRows}
  autoFocus
    />
);



/**
 * Helper function that controls picture upload of the post component and is also the footer of the post component
 *
 * @function
 * @param {Function} handleOk -  controls what happens when the submit button  of the modal is clicked
 * @return {Object} the input part of the createpost component
 */
const CreatePostButtons = props => (

    <section className="modal-footer">
    <Upload>
            <Icon
                type="picture"
                style={{
                    fontSize: 32,
                    color: '#1890ff',
                    display: 'inline',
                }}
            />
        </Upload>

        <Button key="submit" type="primary" onClick={props.handleOk}>
			Post
</Button>
    </section>
);




/**
 * full create post component which combines the CreatePostInput ans CreatePostButtons component. i
 *
 * @function
 * @param {String} placeholder - the placeholder for the input component
 * @param {integer} minRows - the minimum amount of rows that the input component will initially contain
 *  * @param {Function} handleOk -  controls what happens when the submit button  of the modal is clicked
 * @return {Object} the input part of the createpost component
 */

const CreatePostComponent = props => (

    <>
    <CreatePostInput
  minRows={props.minRows}
		    placeholder={props.placeholder}
		/>
    <div className="comment-post-button">
		    <CreatePostButtons handleOk={props.handleOk} />
		</div>
	</>
);

export { CreatePostInput, CreatePostButtons, CreatePostComponent };

CreatePostButtons.propTypes = {
    minRows: PropTypes.number,
    placeholder: PropTypes.string,
    handleOk: PropTypes.string,
};
