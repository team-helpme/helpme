import React from 'react';
import {
    Icon, Button, Upload, Input
} from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

/**
 * Helper function that is used for creating the input part of the post *component
 * @function
 * @param {String} InputPlaceholder - the placeholder for the input component
 * @param {integer} rowHeight - the minimum amount of rows that the input component will initially contain
 * @return {Object} the input part of the createpost component
 */
const CreatePostInput = props => {
    const { InputPlaceholder, rowHeight } = props;
    return (
        <TextArea
          placeholder={InputPlaceholder}
          size="small"
          className="compose-textarea"
          autosize={{ minRows: rowHeight }}
          autoFocus
        />
    );
};

/**
 * Helper function that controls picture upload of the post component and is also the footer of the post component
 * @function
 * @param {Function} handleOkFunction -  controls what happens when the submit button  of the modal is clicked
 * @return {Object} the input part of the createpost component
 */
const CreatePostButtons = props => {
    const { handleOkFunction } = props;
    return (
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

            <Button key="submit" type="primary" onClick={handleOkFunction}>
                Post
            </Button>
        </section>
    );
};

/**
 * full create post component which combines the CreatePostInput ans CreatePostButtons component. i
 * @function
 * @param {String} InputPlaceholder - the placeholder for the input component
 * @param {integer} rowHeight - the minimum amount of rows that the input component will initially contain
 *  @param {Function} handleOkFunction -  controls what happens when the submit button  of the modal is clicked
 * @return {Object} the input part of the createpost component
 */

const CreatePostComponent = props => {
    const {
        InputPlaceholder,
        rowHeight,
        handleOkFunction,
    } = props;

    return (
        <>
            <CreatePostInput
              InputPlaceholder={InputPlaceholder}
              rowHeight={rowHeight}
            />
            <div className="comment-post-button">
                <CreatePostButtons handleOkFunction={handleOkFunction} />
            </div>
        </>
    );
};

export { CreatePostComponent, CreatePostInput, CreatePostButtons };

CreatePostInput.propTypes = {
    InputPlaceholder: PropTypes.string.isRequired,
    rowHeight: PropTypes.number.isRequired,
};
CreatePostButtons.propTypes = {
    handleOkFunction: PropTypes.func,
};
CreatePostComponent.propTypes = {
    InputPlaceholder: PropTypes.string.isRequired,
    handleOkFunction: PropTypes.func,
    rowHeight: PropTypes.number.isRequired,
};
