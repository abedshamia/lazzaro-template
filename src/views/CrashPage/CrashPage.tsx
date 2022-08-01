import { Result } from 'antd'
import { ReactElement } from 'react'

export default function CrashPage(): ReactElement {
  return (
    <Result
      status="500"
      title="500"
      subTitle="We apologize for the inconvenience. Please try again later."
      style={{ marginBlock: '3.8rem' }}
    />

  )
}
