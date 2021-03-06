/* eslint-disable no-shadow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tabs } from 'antd';

import { components } from '../../layout';
import ForumLatestPost from './ForumLatestPost';
import { ForumTopUsers } from './ForumTopUsers';
import { getError, getIsForumDataLoading, getForumData } from '../selectors';
import { loadForumData, setForumDataError, setForumDataSuccess } from '../actions';
import { STRINGS, TabPanes } from '../constants';

const { PageLayout } = components;
const { PAGE_TITLE } = STRINGS;
const { TabPane } = Tabs;

export class ForumComponent extends Component {
    componentDidMount() {
        const { loadForumData } = this.props;
        loadForumData();
    }

    render() {
        const { forumData, isForumDataLoading } = this.props;
        return (
            <PageLayout
                isSiderPresent={!isForumDataLoading}
                isFooterPresent={false}
                title={PAGE_TITLE}
                selectedKey="2"
            >
                <main className="forum_content">
                    <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                        {
                            TabPanes().map(tabpane => {
                                const { key, tab } = tabpane;
                                let children;
                                if (key === '1') {
                                    children = (
                                        <section className="forum_latest_tab">
                                            <ForumTopUsers
                                                isForumDataLoading={isForumDataLoading}
                                            />
                                            <ForumLatestPost blogData={forumData} />
                                        </section>
                                    );
                                }
                                return (
                                    <TabPane tab={tab} key={key}>{children}</TabPane>
                                );
                            })

                        }
                    </Tabs>
                </main>
            </PageLayout>
        );
    }
}

const mapStateToProps = state => ({
    error: getError(state),
    forumData: getForumData(state),
    isForumDataLoading: getIsForumDataLoading(state),
});

const forumActions = {
    loadForumData,
    setForumDataError,
    setForumDataSuccess,
};

const mapDispatchToProps = dispatch => bindActionCreators(forumActions, dispatch);
const Forum = connect(mapStateToProps, mapDispatchToProps)(ForumComponent);
export default Forum;

ForumComponent.propTypes = {
    forumData: PropTypes.arrayOf(PropTypes.shape({
        answers: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        votes: PropTypes.number.isRequired,
    })),
    isForumDataLoading: PropTypes.bool,
    loadForumData: PropTypes.func,
};

ForumComponent.defaultProps = {
    forumData: [],
    isForumDataLoading: true,
    loadForumData: () => null,
};
