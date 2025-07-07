'use client'

import styled from "@emotion/styled"
import { useRouter } from "next/navigation"
import React from "react"
import { colors } from "src/styles"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }
  return (
    <StyledWrapper onClick={() => handleClick(children)}>
      {children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 50px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  color: ${colors.light.text.secondary};
  background-color: ${colors.light.background.secondary};
  cursor: pointer;
  
  [data-theme="dark"] & {
    color: ${colors.dark.text.secondary};
    background-color: ${colors.dark.background.secondary};
  }
  
  &:hover {
    background-color: ${colors.light.primary[100]};
    color: ${colors.light.primary[700]};
    
    [data-theme="dark"] & {
      background-color: ${colors.dark.primary[200]};
      color: ${colors.dark.primary[800]};
    }
  }
`
