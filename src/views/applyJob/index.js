import React from 'react';
import ApplyJob from '../../components/ApplyJob';


const ApplyJobView = (props) => {
    return (
        <ApplyJob
        id = {props.match.params.id}
        />
    );
};

export default ApplyJobView;