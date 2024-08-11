import React from 'react'
import { IProgressRecord } from '../../models';
import { Table, TableColumnsType } from 'antd';
import ProgressRecordItem from './ProgressRecordItem';
import moment from 'moment';

interface ProgressRecordTableProps {
  records: IProgressRecord[];
}

interface DataType {
  key: React.Key;
  createdDate: string;
  record: IProgressRecord;
}

const columns :TableColumnsType<DataType> = [
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
    }
]
const ProgressRecordTable: React.FC<ProgressRecordTableProps> = ({records}) => {
    const data = records?.map((record, index) => ({
        key: index,
        createdDate: moment(record.createdAt).format('LL') ,
        record: record
    }));
    console.log("🚀 ~ file: ProgressRecordTable.tsx:26 ~ data ~ data:", data)

  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <ProgressRecordItem record={record?.record} />,
        }}
        dataSource={data}
      />
    </div>
  );
}

export default ProgressRecordTable