import React,{ useState,useEffect,useRef}  from 'react';
import ApprovalLogsComponent from '../Component/Approvals/approvalLogs.component';
import history from '../Inits/history';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import { bindActionCreators } from 'redux';
import {CurrentYear,PastYear} from '../Store/Actions/Approvals/approval.action';
import { connect } from 'react-redux';

import Select from '@atlaskit/select';
const ApprovalLogsContainer=(props)=>{
    const [year, setYear] = useState(2019);
    const [data,setData] = useState();
     const someProps=useRef(props);
    useEffect(() => {
        const setMyData=()=>{
            if(data===undefined){
                props.CurrentYear(year); 
                setData(props.data? props.data.data: undefined); 
            } 
        } 
        setMyData();        
      },[props.data]);
      useEffect(() => {
        const someOtherData=()=>{
            setData(someProps.data?someProps.data.data:undefined);
        }
        someOtherData();
      }, [year]);

    const PreviousYear=async ()=>{
        setYear(year - 1);
        await props.PastYear(year-1);
    }
    const NextYear=async ()=>{
       // const date=new Date();
       // const currentYear=date.getFullYear();
       // if(year<currentYear){
            setYear(year + 1);
            await props.CurrentYear(year+1);
        //}
    }
    const FilterStatus=(e)=>{
        if(e.label==='All'){
            setData(props.data.data);
        }
        else{
            const newData = props.data.data.filter(data=>data.status===e.label);
            setData(newData);
        }       
    }
        return (
            <div className="main-container is-collapsed approval-page" id="main-container">
                <div id="content">
                 <div className="page-title">
                        <div className="back-page" onClick={()=>history.push('/ui/approvals')}>
                            <ChevronLeftLargeIcon /> Back to Approvals
                        </div> 
                        <h1 className="heading-title"><div className="avtar-mg"><span className="icon-account_icon"></span></div> Architect</h1>
                    </div>
                    <div className="approvalLogsHeading">
                                <div>Approval Logs</div>
                                <div>
                                    <span onClick={()=>PreviousYear()}>
                                    <ChevronLeftLargeIcon/>
                                    </span>
                                    <span className="currentYearApprovalogs">
                                        <div>Current Period</div>
                                        <div>{year}</div>
                                    </span>
                                    <span onClick={()=>NextYear()}>
                                    <ChevronRightLargeIcon/>
                                    </span>
                                </div>
                                <div>
                                    <span>Status</span>
                                <Select
                                className="approvalLogsSelect"
                                options={[
                                    { label: 'All', value: 'All' },
                                    { label: 'Approved', value: 'Approved' },
                                    { label: 'Open', value: 'Open' },
                                    { label: 'Rejected', value: 'Rejected' },
                                    { label: 'Waiting for Approval', value: 'Waiting for Approval' },
                                   
                                ]}
                                defaultValue={{ label: 'All', value: 'All' }}
                                onChange={(e)=>FilterStatus(e)}
                                //onInputChange={(e) => this.select(e)}
                            //placeholder="Choose Mirhai Role"
                            />
                                </div>
                    </div>
               <ApprovalLogsComponent data={data} allProps={props} year={year}/>
               </div>
            </div>
        )
}

const mapStateToProps = state => {
    return {
        data:state.approvalReducer.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
           CurrentYear:CurrentYear,
            PastYear:PastYear
           }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalLogsContainer);