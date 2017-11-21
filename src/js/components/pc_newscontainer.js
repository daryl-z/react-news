/**
 * Created by angelks on 2017/11/21.
 */
import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="container">
                        <div className="leftContainer">
                            <div className="carousel">
                                <Carousel  autoplay>
                                    <div><img src="./1.png" alt=""/></div>
                                    <div><img src="./1.png" alt=""/></div>
                                    <div><img src="./1.png" alt=""/></div>
                                    <div><img src="./1.png" alt=""/></div>
                                </Carousel>
                            </div>
                        </div>
                        <Tabs className="tabs_news">
                            <TabPane tab="新闻" key="1">
                                <PCNewsBlock count={20} type="top" width="100%" bordered="false" />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}