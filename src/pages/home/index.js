import React, { Component }from "react";
import {connect} from 'react-redux';
import { Avatar, Skeleton, Card, List, Row, Col } from 'antd';
import './index.less';
class Home extends Component{

    render(){
        const { Meta } = Card;
        const currentUser= this.props.loggedIn;
        const pageHeaderContent =
        currentUser && Object.keys(currentUser).length ? (
            <div className='pageHeaderContent'>
            <div className='avatar'>
                <Avatar size="large" src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
            </div>
            <div className='content'>
                <div className='contentTitle'>
                {currentUser.username}
                ，Wish you happy every day！
                </div>
            </div>
            </div>
        ) : null;

        const extraContent = (
        <div className='extraContent'>
            <div className='statItem'>
            <p>Project Numbers</p>
            <p>56</p>
            </div>
            <div className='statItem'>
            <p>Team Numbers</p>
            <p>
                8<span> / 24</span>
            </p>
            </div>
            <div className='statItem'>
            <p>Views</p>
            <p>2,223</p>
            </div>
        </div>
        );

        return(
            <div>
            <Row>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false}
                className='card'
                >
                <Skeleton
                loading={false}
                title={false}
                active
                paragraph={{ rows: 3 }}
                avatar={{ size: 'large', shape: 'circle' }}
                >   
                    <Meta
                    title={pageHeaderContent} 
                    />
                    
                </Skeleton>
            </Card>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
                bordered={false}
                >
                <Meta
                    title={extraContent}
                    >
                </Meta>
            </Card>
            </Col>
            </Row>
            <div className="home-wrap">
                welcome
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    // console.log(state.switchMenu)
    console.log(state)
    return {
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps)(Home);