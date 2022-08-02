import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { ErrorInputProps } from '../../types/interfaces'

export function ErrorInput({ msg, mt }: ErrorInputProps): ReactElement<ErrorInputProps> {
  return (
    <ErrorMsg mt={mt}>{msg}</ErrorMsg>
  )
}

const ErrorMsg = styled.p<ErrorInputProps>`
color: red;
margin-bottom: 0;
margin-top: ${({ mt }) => `${mt}rem` || '0'};
`

ErrorInput.defaultProps = {
  mt: 0,
  msg: ''
}
