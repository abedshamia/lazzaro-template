import { useState, useLayoutEffect, ReactElement } from 'react'
import {
  Drawer, Grid, Dropdown, Menu, Space
} from 'antd'
import styled, { useTheme } from 'styled-components'
import { MenuOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

type TTransparent = boolean | undefined
interface IProps {
  transparent?: TTransparent
  position?: TPosition
}

function Navbar({ transparent, position }: IProps): ReactElement {
  const logo = useAppSelector((state) => state.ong?.ongConfig?.brand?.logo)
  const features = useAppSelector((state) => state.ong?.ongConfig?.features)
  let featuresArray: any = []
  if (features) {
    featuresArray = Object.keys(features).filter((key) => features[key] === true)
  }
  const fiveElementsArray = featuresArray?.slice(0, 5)

  const capitlaize = (str: string) => {
    const words = str.split(' ')
    const newWords = words.map((word: string) => word
      .charAt(0).toUpperCase() + word.slice(1)).join(' ')
    return newWords
  }

  const filteredArray = featuresArray?.filter((f: string, i: number) => i > 4).map((f: string) => ({
    key: f,
    label: (
      <li key={f}>
        <a href={`/#${f}`}>{capitlaize(f)}</a>
      </li>
    )
  }))

  const filteredDropDown = (
    <Menu items={filteredArray} />
  )
  const changeNavbarLinks = (feature: string) => {
    switch (feature) {
      case 'donations':
        return (
          <li key="donate">
            <NavLink to="/donate">Donate</NavLink>
          </li>
        )

      case 'market':
        return (
          <li key="shop">
            <NavLink to="/shop">Shop</NavLink>
          </li>
        )
      case 'partners':
        return (
          <li key="partners">
            <NavLink to="/partners">Partners</NavLink>
          </li>
        )
      default:
        return (
          <li key={feature}>
            <a href={`/#${feature}`}>{capitlaize(feature)}</a>
          </li>
        )
    }
  }
  const { secondary } = useTheme()
  const [navBarBackground, setNavBarBackground] = useState<'none'| string>('none')
  useLayoutEffect(() => {
    setNavBarBackground(transparent ? 'none' : secondary)
    if (!transparent) return

    window.addEventListener('scroll', () => {
      const { offsetHeight: screenHeight, scrollTop: currentHeight } = document.documentElement
      const navbarHeight = 200

      if (currentHeight > screenHeight - navbarHeight) setNavBarBackground(secondary)
      else setNavBarBackground('none')
    })

    return () => window.removeEventListener('scroll', () => {
      setNavBarBackground('none')
    })
  }, [])

  const [visible, setVisible] = useState(false)

  const { useBreakpoint } = Grid
  const { md } = useBreakpoint()

  return (
    <NavBar position={position} bgColor={navBarBackground}>
      <div style={{ padding: '0.5rem' }}>
        <NavLink to="/">
          <ImageContainer>
            <img src={logo} alt="logo" />
          </ImageContainer>
        </NavLink>
      </div>

      {!md && <MenuOutlined onClick={() => setVisible(true)} style={{ color: 'white' }} />}

      {md && (
      <CustomNav>
        <ul>
          <li key="about-us">
            <a href="/#about">About Us</a>
          </li>
          {featuresArray?.length === 5 ? featuresArray?.map((feature: string) => (
            changeNavbarLinks(feature)
          ))
            : (
              <>
                {fiveElementsArray?.map((feature: string) => (
                  changeNavbarLinks(feature)
                ))}

                <CustomDropDown arrow overlay={filteredDropDown}>
                  <Space>
                    <a href="#">More</a>
                  </Space>
                </CustomDropDown>
              </>
            )}
          <li key="contact-us">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </CustomNav>
      )}

      <Drawer width={200} placement="right" onClose={() => setVisible(false)} visible={visible}>
        <Links items={featuresArray} mode="inline" />
      </Drawer>
    </NavBar>
  )
}

const NavBar = styled.nav<{ position: TPosition, bgColor: TBgColor }>`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 4.1rem;
  border-bottom: 1px solid #ccc;
  position: ${({ position }) => position};
  align-items: center;
  width: 100%;
  border-bottom: none;
  z-index: 99;
  transition: all 0.4s ease;
  background-color: ${({ bgColor }) => bgColor};
`

const ImageContainer = styled.div`
  max-width: 180px;

  img {
    max-width: 180px;
  max-height: 70px;
  width: 50px;
  }
`

const CustomNav = styled.nav`
ul {
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  font-size: 1.1rem;
  list-style-type: none;  
  margin-bottom: 0;
  li a{
  color: #ddd;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
}

}



`

const CustomDropDown = styled(Dropdown)`
a {
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
}

`
const Links = styled(Menu)`
  flex: 1;
  justify-content: flex-end;
  border-bottom: none;
  background: none;

  a {
    color: white !important;
  }

  @media (max-width: 767px) {
    a {
      color: black !important;
    }
  }
`

Navbar.defaultProps = {
  transparent: false,
  position: 'static'
}
export default Navbar
