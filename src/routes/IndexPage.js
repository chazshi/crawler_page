import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss';

import { Link } from 'dva/router'; 

import { Layout, Menu, Breadcrumb, Icon, Pagination, Table } from 'antd';

import fetch from 'dva/fetch';

import AllCitys from './AllCitys';

import moment from "moment";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// import CountPage from './CountPage';



//TODO: 
// 1. sorter检查，重新设计好
// 2. 搜索功能
// 3. sorter两段而不是三段
// 4. Table点击sorter之后显示的问题
// 5. 选中所有地区后筛选出现问题




// 1. 数据库重复问题，以title为准消除重复！！！   设置title为unique键，已解决







class IndexPage extends React.Component{

  getTodaysInfos(){
    this.props.dispatch({type: 'infos/fetch', dateparam: moment(new Date()).format('YYYY-MM-DD')});
  }

  getAllInfos() {
    this.props.dispatch({type: 'infos/fetch'})
  }

  onClickHandler(title) {
    // title.forEach(element => {
    //   console.log('element: ' + element);
    // });
    const { dispatch} = this.props;

    dispatch({type:'infos/breadcrumb', payload: {
      breadcrumb: ['主页', '招标信息', title.props.children],
      breadcrumbId: title.props.eventKey
    }})
    // console.dir(title.props.eventKey);
    if(title.props.eventKey === "1") {
      // console.log('title.props.eventKey');

      // let date = new Date();
      // console.log(date);
      // let statusPassTime = moment(parseInt(new Date()).format('YYYY-MM-DD'),
      // console.log(moment(new Date()).format('YYYY-MM-DD'));

      this.getTodaysInfos();

    } else if(title.props.eventKey === "2"){
      this.getAllInfos();
    }
  }



  render() {
    // console.log('IndexPage props: ')
    // console.log(this.props)
    // console.log(citysdata)
    // console.log('data and load: ')
    // console.log(data)
    // console.log(load)
    this.getTodaysInfos();

    return (
    
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              {/* <div className="wrapper"> */}
                <img src={require("../assets/everycare-logo-white.png")}  className={styles.logo} alt=""/>
                
              {/* </div> */}
            </Menu.Item>
            <Menu.Item key="2">
              <div className={styles.logo_title}>招标信息监测</div>
            </Menu.Item>
            {/* <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item> */}
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={
                ({ item, key, keyPath })=>{
                  this.onClickHandler(item)
                }

              }

              
              
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />控制面板</span>}>
                <Menu.Item key="1">今日信息</Menu.Item>
                <Menu.Item key="2">所有地区</Menu.Item>
                {/* <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item> */}
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />配置面板</span>}>
                <Menu.Item key="3">提醒设置</Menu.Item>
                <Menu.Item key="4">增加地区</Menu.Item>
                {/* <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item> */}
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />其他面板</span>}>
                <Menu.Item key="5">
                <Link to={ 
                    { 
                        pathname:"/count", 
                        query:{foo: 'foo', boo:'boo'},  
                        state:{data:'hello'}   
                    } 
                } >测手速</Link>
                  
                </Menu.Item>
                {/* <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item> */}
              </SubMenu>
            </Menu>
          </Sider>
          

          
          <AllCitys/>

        </Layout>
      </Layout>
  
    );
  }
}


IndexPage.propTypes = {
};


// export default IndexPage;

// 使用connect方法传入state到props
// export default connect( ({infos})=>{
//   return {infosdata: infos.infosdata, citysdata: infos.citysdata, load: infos.load};
// } )(IndexPage);

export default connect()(IndexPage);
