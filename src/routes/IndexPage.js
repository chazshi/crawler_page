import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import { Link } from 'dva/router'; 

import { Layout, Menu, Breadcrumb, Icon, Pagination, Table } from 'antd';

import fetch from 'dva/fetch';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// import CountPage from './CountPage';



//TODO:sorter要重新写，filter加一个搜索功能
//Table中间黑色有问题，sort完就出问题了




function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

function onClick(uri) {
  console.log(uri);
}


class IndexPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      Breadcrumb: ['主页', '招标信息', '所有信息']
    } 
  }

  UNSAFE_componentWillMount() {
    // console.log('into mount')
    const { dispatch} = this.props;
    
    dispatch({type: 'infos/fetch'})

  }

  // componentDidMount() {
  //   console.log(this.props.data)
  // }

  UNSAFE_componentWillReceiveProps() {
    // console.log('init')
    // this.props.citysdata?columns[0].filters.push(citysdata):'';
  }


  render() {
    const { dispatch, infosdata, citysdata, load} = this.props;
    // console.log('IndexPage props: ')
    // console.log(this.props)
    // console.log(citysdata)
    // console.log('data and load: ')
    // console.log(data)
    // console.log(load)
    const filterList = []
    if(citysdata) {
      citysdata.forEach(element => {
        // console.log(element.city)
        filterList.push({
          text: element.city,
          value: element.city
        });
      });

    }


    const columns = [{
      title: '城市',
      dataIndex: 'city',
      width: 100,
      filters: filterList,
    
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => {
        // console.log(a.city,a.city.charCodeAt(0));
        // console.log(b.city,b.city.charCodeAt(0));
        return a.city.charCodeAt(0) - b.city.charCodeAt(0);
      },
    }, {
      title: '项目名称',
      dataIndex: 'title',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.title - b.title,
    }, {
      title: '时间',
      dataIndex: 'time',
      width: 150,
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        // var adate = new Date(a); 
        // var bdate = new Date(b);
        var adate = new Date(a.time.replace(/-/g, '/'));
        var bdate = new Date(b.time.replace(/-/g, '/'));
    
        var atime = Date.parse(adate);
        var btime = Date.parse(bdate);
        // console.log('a时间：' +  atime)
        // console.log('b时间：' +  btime)
        return atime - btime;
      },
    }];

    var breadcrumb = []
    var keyId = 0
    this.state.Breadcrumb.forEach(element => {
      breadcrumb.push(
        <Breadcrumb.Item key={keyId++}>{element}</Breadcrumb.Item>
      )
    });

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
            <Menu.Item key="1">LOGO</Menu.Item>
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
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />控制面板</span>}>
                <Menu.Item key="1" onClick={()=>{
                  this.setState({
                    Breadcrumb: [
                      '主页',
                      '招标信息',
                      '所有信息',
                    ]
                  })
                   }}>所有地区</Menu.Item>
                <Menu.Item key="2">分开展示</Menu.Item>
                {/* <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item> */}
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />配置面板</span>}>
                <Menu.Item key="5">提醒设置</Menu.Item>
                <Menu.Item key="6">增加地区</Menu.Item>
                {/* <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item> */}
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />其他面板</span>}>
                <Menu.Item key="9">
                <Link to={ 
                    { 
                        pathname:"/count", 
                        query:{foo: 'foo', boo:'boo'},  
                        state:{data:'hello'}   
                    } 
                } >count</Link>
                  
                </Menu.Item>
                {/* <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item> */}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                  
                  {breadcrumb}

              {/* <Breadcrumb.Item>合肥</Breadcrumb.Item> */}
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              
              
              {load? 
                <div>数据加载中</div>
                :
                <Table 
                  columns={columns} 
                  rowKey={ data=>data.id } 
                  dataSource={infosdata} 
                  onChange={onChange} 
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        console.log('clicked:' + record.link)

                        //this.props.history.push('http://' + record.link)

                        window.location.href = 'http://'+record.link
                        //console.log(this.props.history.push('http://' + record.link))
                        },       // 点击行
                      onMouseEnter: () => {},  // 鼠标移入行
                    };
                  }}
                  />
                  
              }
  
            </Content>
          </Layout>
        </Layout>
      </Layout>
  
    );
  }
}


IndexPage.propTypes = {
};


// export default IndexPage;

// 使用connect方法传入state到props
export default connect( ({infos})=>{
  return {infosdata: infos.infosdata, citysdata: infos.citysdata, load: infos.load};
} )(IndexPage);

