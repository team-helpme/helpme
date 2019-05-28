import React, { Component } from 'react';
import {
    Tabs, List, Avatar, Icon
} from 'antd';
import PageLayout from '../../Layout';
import './Forum.css';
import forum_data from '../../../data/forum_data.json';
import ForumLatestPost from './ForumLatestPost';
import {ForumTopUsers} from './ForumAsides'

const IconText = ({ type, text, action }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} onClick={action} />
        {text}
    </span>
);

const { TabPane } = Tabs;
export default class Forum extends Component {
    state = {
        data: '',
    }

    handleTabChange(key) {
        console.log(key);
    }

    componentDidMount() {
        this.handleDataFetch();
    }

    handleDataFetch = () => {
        this.setState({
            data: forum_data,
        });
    }

    render() {
        const { data } = this.state;
        return (
            <PageLayout
              isSiderPresent={data.length > 0}
              isFooterPresent={false}
              isAuthenticated
              title="Forum | talk about topics you like"
            >
                <main className="forum_content">
                    <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                        <TabPane tab="Latest" key="1">
                            <ForumTopUsers blogData={data}/>
                            <ForumLatestPost blogData={data} />
                        </TabPane>
                        <TabPane tab="Trending" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Favourite" key="3">Content of Tab Pane 3</TabPane>
                        <TabPane tab="Answered" key="4">Content of Tab Pane 4s</TabPane>
                    </Tabs>
                </main>
            </PageLayout>
        );
    }
}
