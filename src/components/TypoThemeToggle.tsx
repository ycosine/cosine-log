'use client'

import styled from "@emotion/styled"
import { useScheme } from "src/hooks/useScheme"
import { HiSun, HiMoon } from 'react-icons/hi'

const TypoThemeToggle: React.FC = () => {
  const [scheme, setScheme] = useScheme()

  const handleToggle = () => {
    setScheme(scheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ToggleButton 
      onClick={handleToggle}
      aria-label={scheme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
      data-theme={scheme}
    >
      {scheme === 'light' ? <HiMoon /> : <HiSun />}
    </ToggleButton>
  )
}

const ToggleButton = styled.button`
  --font-color: ${props => props.theme.scheme === 'dark' ? '#fff' : '#252525'};
  --font-color-secondary: ${props => props.theme.scheme === 'dark' ? '#c9c9c9' : '#5A5A5A'};
  --color-active: ${props => props.theme.scheme === 'dark' ? '#61AEEE' : '#4078F2'};
  --color-hr: ${props => props.theme.scheme === 'dark' ? '#585c69' : '#e8e8e8'};

  background: transparent;
  border: 1px solid var(--color-hr);
  color: var(--font-color-secondary);
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    color: var(--color-active);
    border-color: var(--color-active);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`

export default TypoThemeToggle