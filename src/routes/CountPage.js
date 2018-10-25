import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd';

import styles from './CountPage.scss';


const CountPage = ({ dispatch, count}) => {
    return (
        <div className={styles.normal}>
            <div className={styles.record}>Highest Record: {count.record}</div>
            <div className={styles.current}>{count.current}</div>
            <Button type="primary" onClick={()=>{dispatch({type: 'count/add'}); }}>增加</Button>
        </div>
    )
}

CountPage.propTypes = {
};

// function mapStateToProps(state) {
//     return {
//         count: state.count
//     }
// }
// export default connect( mapStateToProps )(UserPage);

// 使用connect方法传入state到props
export default connect( ({count})=>{
    return {count};
} )(CountPage);
