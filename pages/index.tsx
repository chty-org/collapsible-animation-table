import { useState } from "react";
import { Transition } from '@headlessui/react';
import Table from "../components/Table";

const data_table_columns = [
  {
    title: 'Kind',
    headerClassName: '',
    className: '',
    key: 'kind',
    dataIndex: 'kind',
    render: () => <span>Kind</span>,
    onSortChange: () => {},
  },
  {
    title: 'Name',
    headerClassName: '',
    className: 'text-blue-300',
    key: 'name',
    dataIndex: 'name',
    onSortChange: () => {},
  },
  {
    title: 'Company',
    headerClassName: '',
    className: 'text-blue-300',
    key: 'company',
    dataIndex: 'company',
    onSortChange: () => {},
  },
  {
    title: 'Phone',
    headerClassName: '',
    className: '',
    key: 'phone',
    dataIndex: 'phone',
    render: (value: string) => (
      <div className='inline-flex gap-2 items-center'>
        <p className='text-sm'>{value}</p>
      </div>
    ),
    onSortChange: () => {},
  },
  {
    title: 'Email',
    headerClassName: '',
    className: '',
    key: 'email',
    dataIndex: 'email',
    render: (value: string) => (
      <div className='inline-flex py-3 gap-2 items-center'>
        <p className='text-sm'>{value}</p>
      </div>
    ),
    onSortChange: () => {},
  },
]

const data_table_values = [
  {
    kind: 'a',
    name: 'Agnez Mo',
    company: 'UTA',
    phone: '(310) 264-6055',
    email: 'brooke.meller@unitedtalent.com',
  },
  {
    kind: 'a',
    name: 'Agnez Mo',
    company: 'UTA',
    phone: '(310) 264-6055',
    email: 'brooke.meller@unitedtalent.com',
  },
  {
    kind: 'a',
    name: 'Agnez Mo',
    company: 'UTA',
    phone: '(310) 264-6055',
    email: 'brooke.meller@unitedtalent.com',
  },
  {
    kind: 'a',
    name: 'Agnez Mo',
    company: 'UTA',
    phone: '(310) 264-6055',
    email: 'brooke.meller@unitedtalent.com',
  },
  {
    kind: 'a',
    name: 'Agnez Mo',
    company: 'UTA',
    phone: '(310) 264-6055',
    email: 'brooke.meller@unitedtalent.com',
  },
  {
    kind: 'a',
    name: 'Agnez Mo',
    company: 'UTA',
    phone: '(310) 264-6055',
    email: 'brooke.meller@unitedtalent.com',
  },
]

export default function () {
  return (
    <div className="p-20">
      <Table
        columns={data_table_columns}
        dataSource={data_table_values}
        checkable={true}
        responsive={true}
        renderCollapse={(col: any, key: Number) => {
          return data_table_values.map((data, index) => (
            <Transition
              appear={true}
              show={true}
              key={`${key}-${index}`}
              enter='duration-400'
              enterFrom='opacity-0 h-0'
              enterTo='opacity-100 h-auto'
              leave='duration-150'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              className="flex items-center"
            >
              <div
                className={
                  index !== data_table_values.length - 1
                    ? `border-none bg-secondary`
                    : 'bg-secondary'
                }
              >
                <div className='relative mx-auto'>
                  <div className='bg-primary w-[1px] h-[50px] mx-auto -top-9 absolute' />
                </div>
              </div>
              <div>Kind</div>
              <div className='text-blue-300 text-sm'>{data?.name}</div>
              <div className='text-blue-300 text-sm'>{data?.company}</div>
              <div>
                <div className='inline-flex gap-2 items-center'>
                  <p className='text-sm'>{data?.phone}</p>
                </div>
              </div>
              <div>
                <div className='inline-flex py-3 gap-2 items-center'>
                  <p className='text-sm'>{data?.email}</p>
                </div>
              </div>
              <div />
            </Transition>
          ))
        }}
      />
    </div>
  );
}
