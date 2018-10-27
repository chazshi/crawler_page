import React from 'react';
import { connect } from 'dva';
import { Button, Layout, Menu, Breadcrumb, Icon, Pagination, Table, Input, Tooltip, notification } from 'antd';
import styles from './AllCitys.scss';


const { Header, Content, Sider } = Layout;


function onChange(pagination, filters, sorter) {
    // console.log('params', pagination, filters, sorter);
  }
  
function onClickHandler(title) {
    // console.log('click: ' + title);
}

class AllCitys extends React.Component{
    state = {
        searchText: '',
      };
    

      handleSearch = (selectedKeys, confirm) => () => {
        confirm(); // 重复执行，相当于刷新，隐去搜索栏
        this.setState({ searchText: selectedKeys[0] });
      }
    
      handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
      }

    render(){
        const {load, citysdata, infosdata, breadcrumb, breadcrumbId} = this.props;

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
          onFilter: (value, record) => {
            // console.log(value)
            return record.city.indexOf(value) === 0
          },
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
          
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div className={styles.custom_filter_dropdown}>
                        <Input
                            ref = {ele=>this.searchInput = ele}
                            placeholder = 'Search what you need!'
                            value = {selectedKeys[0]}
                            onChange = {e=> setSelectedKeys(e.target.value? [e.target.value] : [])}
                            onPressEnter = {this.handleSearch(selectedKeys, confirm)}
                        />
                        <Button type='primary' onClick={this.handleSearch(selectedKeys,confirm)}>搜索</Button>
                        <Button onClick={this.handleReset(clearFilters)}>清空</Button>

                </div>
            ),
            filterIcon: filtered => {
                return (
                      <Icon type="search" theme="outlined" style={{color: filtered? '#0f0':'#000', fontSize: 15, fontWeight: 700, width: 40,  }} />
                  
                )

            },
            onfilter: (value, record) => record.title.includes(value),
            onFilterDropdownVisibleChange: (visible) => {
                // FIXME:什么意思???
                if(visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    });
                }
            },

            render: (text) => {
                const {searchText} = this.state;
                
                var markText = searchText?(
                    <span>
                        {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => {
                            return fragment === searchText?(<span key={i} className={styles.highlight}>{fragment}</span>):fragment
                        })}
                        
                        
                    </span>
                ):text;

                
                return markText;
            },


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
    
        // console.log(breadcrumb)
        var breadcrumbView = []
        var keyId = 0
        if(breadcrumb) {
            breadcrumb.forEach(element => {
                // console.log(element)
                breadcrumbView.push(
                <Breadcrumb.Item key={keyId++}>{element}</Breadcrumb.Item>
              )
            });

        }

        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                      
                      {breadcrumbView}
                      
    
                  {/* <Breadcrumb.Item>合肥</Breadcrumb.Item> */}
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                  
                  
                  {load? 
                    <h1>数据加载中...</h1>
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
        )
    }
}

AllCitys.propTypes = {
};

// function mapStateToProps(state) {
//     return {
//         count: state.count
//     }
// }
// export default connect( mapStateToProps )(UserPage);

// 使用connect方法传入state到props
export default connect( ({infos})=>{
    // console.log(breadcrumb)
    return {infosdata: infos.infosdata, citysdata: infos.citysdata, load: infos.load, breadcrumb: infos.breadcrumb, breadcrumbId: infos.breadcrumbId};
  } )(AllCitys);
