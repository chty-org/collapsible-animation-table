import React, { Fragment, useState } from 'react'
import cx from 'classnames'

enum CHECKBOX_STATES {
  Checked,
  Indeterminate,
  Unchecked,
}

type SortType = 'asc' | 'desc' | undefined

type TableProps = {
  dataSource: Array<any>
  columns: Array<{
    title?: string
    dataIndex?: any
    className?: string
    key?: any
    render?: React.ReactNode | any
    onSortChange?: (e: SortType) => void
  }>
  className?: string
  tableWrapperClassName?: string
  headerClassName?: string
  responsive?: boolean
  emptyText?: string | React.ReactNode
  index?: any
  loading?: boolean
  scrollY?: string | number
  checkable?: boolean
  renderCollapse?: (data: any, key: any) => React.ReactNode
  onSelectedChange?: (selectedRows: Array<any>) => void
}

const Table: React.FC<TableProps> = ({
  className,
  dataSource,
  columns,
  emptyText,
  responsive = false,
  scrollY,
  tableWrapperClassName,
  checkable = false,
  renderCollapse,
  onSelectedChange = () => {},
}) => {
  const [data, setData] = useState(
    dataSource.map((data) => ({
      ...data,
      ...(checkable && { checked: false }),
      ...(renderCollapse && { collapsed: false }),
    }))
  )

  // Checkable module
  const checkedState = () => {
    const checkedDataLen: number = data.filter((d) => d.checked).length

    return checkedDataLen === 0
      ? CHECKBOX_STATES.Unchecked
      : checkedDataLen === data.length
      ? CHECKBOX_STATES.Checked
      : CHECKBOX_STATES.Indeterminate
  }

  const onRowChange = (checked: boolean, index: number) => {
    data[index].checked = checked
    setData([...data])
    onSelectedChange(data.filter((d) => d.checked))
  }

  // Sortable module
  const [sortField, setSortField] = useState<Record<string, SortType>>({})

  // Collapsible module
  const onRowClick = (index: number) => {
    data[index].collapsed = !data[index].collapsed
    setData([...data])
  }


  return dataSource.length < 1 ? (
    <div
      className={cx('flex justify-center items-center bg-white py-5')}
    >
      {emptyText ?? 'No data available!'}
    </div>
  ) : (
    <div
      className={cx('overflow-hidden bg-white', {
        'overflow-x-auto': responsive,
        'overflow-y-auto': !!scrollY,
        [tableWrapperClassName || '']: !!tableWrapperClassName,
      })}
      style={{ maxHeight: scrollY || 'unset' }}
    >
      <div
        className={cx('', {
          [`table-sticky-header`]: !!scrollY,
          [className || '']: !!className,
        })}
      >
        {/* Header */}
        <div className='flex'>
          {checkable && (
            <div className='pl-6'>
              <input
                type='checkbox'
                value={checkedState()}
                onChange={(e) => {
                  const checked = e.currentTarget.checked

                  setData([
                    ...data.map((item) => ({
                      ...item,
                      checked: checked,
                    })),
                  ])

                  onSelectedChange(checked ? data : [])
                }}
              />
            </div>
          )}
          {columns.map(({ title, key, onSortChange }) => {
            const order = sortField[key]

            return (
              <div
                key={key}
                className={cx('whitespace-nowrap', {
                  'px-6 font-serif text-sm': title && typeof title === 'string',
                })}
              >
                <span
                  className={cx(
                    'mr-1 select-none whitespace-nowrap flex items-center',
                    {
                      'cursor-pointer': !!onSortChange,
                    }
                  )}
                  onClick={() => {
                    if (onSortChange) {
                      if (order === 'asc') sortField[key] = 'desc'
                      else if (order === 'desc') sortField[key] = undefined
                      else sortField[key] = 'asc'

                      setSortField({ ...sortField })
                      onSortChange(sortField[key])
                    }
                  }}
                >
                  {title} {` `}
                  {onSortChange && (
                    <div className='sortable__th__arrow-wrapper'>
                      {order === 'desc' ? (
                        <svg width="7" height="4" viewBox="0 0 7 4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 0L7 4L0 4L3.5 0Z" fill="black"/>
                        </svg>                          
                      ) : order === 'asc' ? (
                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 4.5L-1.27146e-07 0.5L7 0.500001L3.5 4.5Z" fill="#6B6A69"/>
                        </svg>
                      ) : null}
                    </div>
                  )}
                </span>
              </div>
            )
          })}
          {renderCollapse && <div className='w-0'></div>}
        </div>
        {/* Body */}
        {data.map((d, index) => (
          <Fragment key={index}>
            <div className='flex bg-white items-center'>
              {checkable && (
                <div className='pl-6'>
                  <input
                    type="checkbox"
                    checked={d.checked}
                    onChange={(e) =>
                      onRowChange(e.currentTarget.checked, index)
                    }
                  />
                </div>
              )}
              {columns.map(
                ({ dataIndex, render, className, key }, index) => (
                  <Fragment
                    key={`${index}-${key}`}
                  >
                    {render ? render(d[dataIndex], d) : d[dataIndex]}
                  </Fragment>
                )
              )}

              {renderCollapse && (
                <div className=''>
                  <button
                    className='t-button t-button-borderless-muted t-button-icon'
                    onClick={() => onRowClick(index)}
                  >
                    {d.collapsed ? (
                      <svg width="7" height="4" viewBox="0 0 7 4" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 0L7 4L0 4L3.5 0Z" fill="black"/>
                      </svg>  
                    ) : (
                      <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 4.5L-1.27146e-07 0.5L7 0.500001L3.5 4.5Z" fill="#6B6A69"/>
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
            {(d.collapsed && renderCollapse) && renderCollapse(d, `${index}-${index}`)}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Table
