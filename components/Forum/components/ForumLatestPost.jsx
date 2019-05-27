import React from 'react'
import './Forum.css'
import {Icon,Divider,Tag,Typography,Skeleton} from 'antd'
import {LOADING_SKELETON} from '../constants'

const { Text,Title } = Typography;

const ForumLatestPost = props => {
   const {blogData} = props

 return blogData.length > 0 ?  blogData.map(data=>{
     const { image, title, answers, votes, views, tag, time} =data
return (
    <section key={title}>
    <section className="forum-item" >
    <img src={image}className="user-avatar"/>

<section className="forum-text">
<Text className="forum-topic">{title}</Text>

    <div className="forum-reaction">
    <span><Text type="secondary" ><Icon type="message" /> {answers} answers</Text></span>
    <span><Text type="secondary" ><Icon type="up-arrow" /> {votes} votes</Text></span>
    <span> <Text type="secondary" ><Icon type="eye" />  {views} views</Text></span>
    </div>

    <div className="forum-time-tag">
     <div className="forum-tag">
     {(tag.split(' ').map((singleTag, id) => {
   return <Tag color="gold" style={{fontSize:10}} key={id}>{singleTag}</Tag>
     })
     
     )}
    
    </div>
    <Text className="forum-time" type="secondary"> Asked {time}</Text>
    </div>
    </section>
    </section>
    <Divider/>
    </section>
)
 }):
            // data loading simulation
            LOADING_SKELETON.map(items => {
                const {
                    paragraph,
                    title,
                    loading,
                    active,
                    avatar,
                    id,
                } = items;
                return (
                    <Skeleton
                      key={id}
                      paragraph={paragraph}
                      title={title}
                      loading={loading}
                      active={active}
                      avatar={avatar}
                      className="skeleton-section"
                    />
                );
            })


}

export default ForumLatestPost;